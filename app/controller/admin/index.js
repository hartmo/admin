const Controller = require('egg').Controller;
class AppController extends Controller {
  async index() {
    const { ctx } = this;
    console.log(ctx.model.Users.findAll());
    await ctx.render('app/app.js', {
      url: ctx.url.replace(/\/app/),
    });
  }
}

module.exports = AppController;
