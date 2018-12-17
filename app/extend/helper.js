'use strict';

const fs = require('fs');
const path = require('path');
const sendToWormhole = require('stream-wormhole');
module.exports = {
  message(status, data) {
    return { status, data };
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
          resolve(this.message(1, { name: stream.filename, path: pathPublic, targetPath, message: '上传成功' }))
        );
      } else {
        return resolve(this.message(0, { pathPublic, targetPath, message: '已存在文件' }));
      }
    });
  },
};
