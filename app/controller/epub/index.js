const Controller = require('egg').Controller;
const fs = require('fs');
const path = require('path');
const pump = require('pump');
const sendToWormhole = require('stream-wormhole');
class AppController extends Controller {
  async index() {
    const { ctx } = this;
    await ctx.render('epub/index.js', {
      title: 'epub阅读器',
    });
  }
  async upload() {
    const { ctx } = this;
    const stream = await ctx.getFileStream();
    const name = 'egg-multipart-test/' + path.basename(stream.filename);
    // 文件处理，上传到云存储等等
    let result;
    try {
      result = await ctx.helper
        .uploadTempFile(stream, ctx.app.config.baseDir, 'epub') // 上传书本
        .then((data) => {
          if (data.status === 1) {
            return ctx.service.admin.book
              .create({ path: data.data.path, name: data.data.name, state: 1 }) // 创建书本
              .then((res) => {
                return ctx.helper.message(1, res);
              })
              .catch((e) => {
                return ctx.helper.message(1, e);
              });
          }
          return ctx.service.admin.book
            .find({ name: data.data.name }) // 查找是否存在书本
            .then((res) => {
              return ctx.helper.message(1, res);
            })
            .catch((e) => {
              return ctx.helper.message(1, e);
            });
        })
        .catch((message) => {
          return message;
        });
    } catch (err) {
      // 必须将上传的文件流消费掉，要不然浏览器响应会卡死
      await sendToWormhole(stream);
      throw err;
    }

    ctx.body = {
      result,
      // 所有表单字段都能通过 `stream.fields` 获取到
      fields: stream.fields,
    };
  }
}

module.exports = AppController;
