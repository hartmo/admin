const Service = require('egg').Service;

class UserService extends Service {
  /**
   * 查找所有的用户列表
   * @param {Number} num  //搜索条数
   * @param {Number} size  //搜索页码
   */
  async findAll(num, size) {
    const { ctx } = this;
    const query = { limit: Number(num * (size - 1)), offset: Number(num * size) };
    return await ctx.model.Users.findAll();
  }
  /**
   * 查询用户
   * @param {Object} setQuery
   */
  async find(selectQuery) {
    const { ctx } = this;
    return await ctx.model.Users.find(selectQuery);
  }
  /**
   * 创建用户
   * @param {Object} setQuery 创建对象
   */
  async create(setQuery) {
    const { ctx } = this;
    if (setQuery.id) {
      return false;
    }
    const user = await this.find({ phone: setQuery.phone });
    if (user) {
      return false;
    }
    return await ctx.model.Users.create(setQuery);
  }
  /**
   * 更新数据
   * @param {Object} setQuery 插入对象
   */
  async update(updateQuery) {
    const { ctx } = this;
    const user = await this.findById(updateQuery.id);
    if (!user) {
      return {};
    }
    return await ctx.model.Users.update(updateQuery);
  }
}

module.exports = UserService;
