const Controller = require('egg').Controller;

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

class UserController extends Controller {
  async findAll() {
    const ctx = this.ctx;
    const num = ctx.query.num || 25;
    const size = ctx.query.size > 0 ? ctx.query.size : 1 || 1;
    ctx.body = await ctx.service.admin.user.findAll(num, size);
  }
}

module.exports = UserController;
