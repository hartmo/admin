const Service = require('egg').Service;

class UserService extends Service {
  /**
   * 查找单条数据
   * @param {Int} id
   */
  async findById(id) {
    const { ctx } = this;
    return await ctx.model.Book.findById(Number(id));
  }
  /**
   * 查找
   * @param {String} name
   */
  async find(name) {
    const { ctx } = this;
    return await ctx.model.Book.find({ name }).then((res) => {
      return { id: res.id, name: res.name, state: res.state };
    });
  }
  /**
   * 查找所有的权限列表
   * @param {Number} num  //搜索条数
   * @param {Number} size  //搜索页码
   */
  async findAll(num, size) {
    const { ctx } = this;
    const query = { limit: Number(num * (size - 1)), offset: Number(num * size) };
    return await ctx.model.Book.findAll(query);
  }
  /**
   * 创建数据
   * @param {Object} data
   */
  async create(data) {
    const { ctx } = this;
    return await ctx.model.Book.create(data).then((res) => {
      return { id: res.id, name: res.name, state: res.state };
    });
  }
  /**
   * 更新
   * @param {Object} data
   */
  async update(data) {
    const { ctx } = this;
    const book = await this.findById(data.id);
    if (!book) {
      return ctx.helper.message(-1, { message: '不存在书籍' });
    }
    return await ctx.model.Book.update(data).then((res) => {
      return { id: res.id, name: res.name, state: res.state };
    });
  }
}

module.exports = UserService;
