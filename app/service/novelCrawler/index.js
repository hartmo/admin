const Service = require('egg').Service;

class bookService extends Service {
  /**
   * 查找所有分类
   */
  async findclassification() {
    const { ctx } = this;
    return await ctx.model.Book.findById(Number());
  }
}

module.exports = bookService;
