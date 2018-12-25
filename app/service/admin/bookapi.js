const Service = require('egg').Service;
const api = {
  classification: 'http://api.zhuishushenqi.com/cats/lv2', // 获取分类
  categories: 'http://api.zhuishushenqi.com/book/by-categories', // 根据分类获取小说列表
  details: 'http://api.zhuishushenqi.com/book/', // 获取书本信息
  menu: 'http://api.zhuishushenqi.com/mix-atoc/', // 获取书本目录
  chapterup: 'http://chapterup.zhuishushenqi.com/chapter/', // 获取章节内容
};
class UserService extends Service {
  async classification() {
    const { ctx } = this;
    const result = await ctx.curl(api.classification, {
      // 3 秒超时
      timeout: 3000,
      dataType: 'json',
    });
    return result.data;
  }
  /**
   *
   * @param {Object} data
   * gender: 男生:mael 女生:female 出版:press
   * type: 热门:hot 新书:new 好评:repulation 完结: over 包月: month
   * major: 大类别 从接口1获取
   * minor: 小类别 从接口4获取 (非必填)
   * start: 分页开始页
   * limit: 分页条数
   */
  async novellist(data) {
    const { ctx } = this;
    const result = await ctx.curl(api.categories, {
      // 3 秒超时
      timeout: 3000,
      dataType: 'json',
      data,
    });
    result.data.host = 'http://statics.zhuishushenqi.com';
    return result.data;
  }
  /**
   * 获取书本详细信息
   * @param {String} id 书籍id
   */
  async bookDetails(id) {
    const { ctx } = this;
    const query = api.details + id;
    const result = await ctx.curl(query, {
      // 3 秒超时
      timeout: 3000,
      dataType: 'json',
    });
    result.data.host = 'http://statics.zhuishushenqi.com';
    return result.data;
  }
  /**
   * 获取小说章节
   * @param {String} id 书本唯一id
   */
  async bookMenu(id) {
    const { ctx } = this;
    const query = api.menu + id + '?view=chapters';
    const result = await ctx.curl(query, {
      // 3 秒超时
      timeout: 3000,
      dataType: 'json',
    });
    return result.data;
  }
  /**
   * 获取章节内容
   * @param {String} url 获取章节内容
   */
  async chapterup(url) {
    const { ctx } = this;
    const query = api.chapterup + encodeURIComponent(url);
    console.log(query);
    console.log('------------------------------------', '111');
    const result = await ctx.curl(query, {
      // 3 秒超时
      timeout: 3000,
      dataType: 'json',
    });
    return result.data;
  }
}

module.exports = UserService;
