const Controller = require('egg').Controller;
class AppController extends Controller {
  async classification() {
    const { ctx } = this;
    const data = await ctx.service.admin.bookapi.classification().then((res) => {
      return res;
    });
    ctx.body = {
      data,
    };
  }
  /**
   * 获取小说列表页
   */
  async novellist() {
    const { ctx } = this;
    const parent = ctx.request.body;
    const data = await ctx.service.admin.bookapi.novellist(parent).then((res) => {
      return res;
    });
    ctx.body = {
      data,
    };
  }
  /**
   * 获取详情
   */
  async bookDetails() {
    const { ctx } = this;
    const parent = ctx.request.body;
    const result = await Promise.all([
      ctx.service.admin.bookapi.bookDetails(parent.id),
      ctx.service.admin.bookapi.bookMenu(parent.id),
    ]);
    ctx.body = {
      details: result[0],
      menu: result[1],
    };
  }
  /**
   * 获取小说列表页
   */
  async chapterup() {
    const { ctx } = this;
    const parent = ctx.request.body;
    const data = await ctx.service.admin.bookapi.chapterup(parent.link).then((res) => {
      return res;
    });
    ctx.body = {
      data,
    };
  }
}

module.exports = AppController;
