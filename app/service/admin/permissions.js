const Service = require('egg').Service;

class UserService extends Service {
  /**
   * 查找所有的权限列表
   * @param {Number} num  //搜索条数
   * @param {Number} size  //搜索页码
   */
  async findAll(num, size) {
    const { ctx } = this;
    const query = { limit: Number(num * (size - 1)), offset: Number(num * size) };
    return await ctx.model.User.findAll(query);
  }
}

module.exports = UserService;
