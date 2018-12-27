'use strict';

const fs = require('fs');
const path = require('path');
const sendToWormhole = require('stream-wormhole');
module.exports = {
  message(status, data) {
    return { status, data };
  },
  /** 异步并发
 * @params list {Array} - 要迭代的数组
 * @params limit {Number} - 并发数量控制数
 * @params asyncHandle {Function} - 对`list`的每一个项的处理函数，参数为当前处理项，必须 return 一个Promise来确定是否继续进行迭代
 * @return {Promise} - 返回一个 Promise 值来确认所有数据是否迭代完成
 */
  mapLimit(list, limit, asyncHandle) {
    const recursion = (arr) => {
      return asyncHandle(arr.shift()).then(() => {

        // 数组还未迭代完，递归继续进行迭代
        if (arr.length > 0) {
          return recursion(arr);
        }
        return true;
      });
    };

    const listCopy = [].concat(list);
    const asyncList = []; // 正在进行的所有并发异步操作
    while (limit--) {
      asyncList.push(recursion(listCopy));
    }
    return Promise.all(asyncList); // 所有并发异步操作都完成后，本次并发控制迭代完成
  },
  // 上传文件
  async uploadTempFile(stream, baseDir, directory) {
    return new Promise((resolve, reject) => {
      const bookformat = stream.filename.split('.')[1];
      directory ? bookformat + '/' + directory : bookformat;
      const targetPath = path.join(baseDir, 'public', bookformat, stream.filename); // 绝对目录路径
      const pathPublic = path.join('public', bookformat, stream.filename); // 保存的目录路径
      const dir = path.join(baseDir, 'public', bookformat); // 目录路径
      stream.on('error', (error) => {
        sendToWormhole(stream);
        return reject(this.message(-1, { message: '保存失败' }));
      });
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }
      if (!fs.existsSync(targetPath)) {
        const ws = fs.createWriteStream(targetPath);
        stream.pipe(ws);
        ws.on('error', reject);
        ws.on(
          'finish',
          resolve(
            this.message(1, {
              name: stream.filename,
              path: pathPublic,
              targetPath,
              message: '上传成功',
            })
          )
        );
      } else {
        return resolve(this.message(0, { pathPublic, targetPath, message: '已存在文件' }));
      }
    });
  },
};
