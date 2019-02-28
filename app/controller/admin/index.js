const Controller = require('egg').Controller;
class AppController extends Controller {
  /**
   * 首页路由
   */
  async home() {
    // console.log(ctx.model.Users.findAll());
    this.ctx.body = '欢迎来到管理后台';
  }
  /**
   * 后台管理路由
   */
  async index() {
    // console.log(ctx.model.Users.findAll());
    await this.ctx.render('admin/app.js', {
      url: this.ctx.url.replace(/\/app/),
    });
  }
}

module.exports = AppController;