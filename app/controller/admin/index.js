const Controller = require('egg').Controller;
class AppController extends Controller {
  async index() {
    const { ctx } = this;
    await ctx.render('admin/app.js', {
      url: ctx.url.replace(/\/app/),
    });
  }
}

module.exports = AppController;
