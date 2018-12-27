const Service = require('egg').Service;
const moment = require('moment');
const api = {
  classification: 'http://api.zhuishushenqi.com/cats/lv2', // 获取分类
  categories: 'http://api.zhuishushenqi.com/book/by-categories', // 根据分类获取小说列表
  details: 'http://api.zhuishushenqi.com/book/', // 获取书本信息
  menu: 'http://api.zhuishushenqi.com/mix-atoc/', // 获取书本目录
  chapterup: 'http://chapterup.zhuishushenqi.com/chapter/', // 获取章节内容
};
const user_agent = [
  'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; en-us) AppleWebKit/534.50 (KHTML, like Gecko) Version/5.1 Safari/534.50',
  'Mozilla/5.0 (Windows; U; Windows NT 6.1; en-us) AppleWebKit/534.50 (KHTML, like Gecko) Version/5.1 Safari/534.50',
  'Mozilla/5.0 (Windows NT 10.0; WOW64; rv:38.0) Gecko/20100101 Firefox/38.0',
  'Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; .NET4.0C; .NET4.0E; .NET CLR 2.0.50727; .NET CLR 3.0.30729; .NET CLR 3.5.30729; InfoPath.3; rv:11.0) like Gecko',
  'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0)',
  'Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.0; Trident/4.0)',
  'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0)',
  'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1)',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.6; rv:2.0.1) Gecko/20100101 Firefox/4.0.1',
  'Mozilla/5.0 (Windows NT 6.1; rv:2.0.1) Gecko/20100101 Firefox/4.0.1',
  'Opera/9.80 (Macintosh; Intel Mac OS X 10.6.8; U; en) Presto/2.8.131 Version/11.11',
  'Opera/9.80 (Windows NT 6.1; U; en) Presto/2.8.131 Version/11.11',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_0) AppleWebKit/535.11 (KHTML, like Gecko) Chrome/17.0.963.56 Safari/535.11',
  'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; Maxthon 2.0)',
  'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; TencentTraveler 4.0)',
  'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1)',
  'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; The World)',
  'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; Trident/4.0; SE 2.X MetaSr 1.0; SE 2.X MetaSr 1.0; .NET CLR 2.0.50727; SE 2.X MetaSr 1.0)',
  'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; 360SE)',
  'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; Avant Browser)',
  'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1)',
  'Mozilla/5.0 (iPhone; U; CPU iPhone OS 4_3_3 like Mac OS X; en-us) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8J2 Safari/6533.18.5',
  'Mozilla/5.0 (iPod; U; CPU iPhone OS 4_3_3 like Mac OS X; en-us) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8J2 Safari/6533.18.5',
  'Mozilla/5.0 (iPad; U; CPU OS 4_3_3 like Mac OS X; en-us) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8J2 Safari/6533.18.5',
  'Mozilla/5.0 (Linux; U; Android 2.3.7; en-us; Nexus One Build/FRF91) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1',
  'MQQBrowser/26 Mozilla/5.0 (Linux; U; Android 2.3.7; zh-cn; MB200 Build/GRJ22; CyanogenMod-7) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1',
  'Opera/9.80 (Android 2.3.4; Linux; Opera Mobi/build-1107180945; U; en-GB) Presto/2.8.149 Version/11.10',
  'Mozilla/5.0 (Linux; U; Android 3.0; en-us; Xoom Build/HRI39) AppleWebKit/534.13 (KHTML, like Gecko) Version/4.0 Safari/534.13',
  'Mozilla/5.0 (BlackBerry; U; BlackBerry 9800; en) AppleWebKit/534.1+ (KHTML, like Gecko) Version/6.0.0.337 Mobile Safari/534.1+',
  'Mozilla/5.0 (hp-tablet; Linux; hpwOS/3.0.0; U; en-US) AppleWebKit/534.6 (KHTML, like Gecko) wOSBrowser/233.70 Safari/534.6 TouchPad/1.0',
  'Mozilla/5.0 (SymbianOS/9.4; Series60/5.0 NokiaN97-1/20.0.019; Profile/MIDP-2.1 Configuration/CLDC-1.1) AppleWebKit/525 (KHTML, like Gecko) BrowserNG/7.1.18124',
  'Mozilla/5.0 (compatible; MSIE 9.0; Windows Phone OS 7.5; Trident/5.0; IEMobile/9.0; HTC; Titan)',
  'UCWEB7.0.2.37/28/999',
  'NOKIA5700/ UCWEB7.0.2.37/28/999',
  'Openwave/ UCWEB7.0.2.37/28/999',
  'Mozilla/4.0 (compatible; MSIE 6.0; ) Opera/UCWEB7.0.2.37/28/999',
  'Mozilla/6.0 (iPhone; CPU iPhone OS 8_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/8.0 Mobile/10A5376e Safari/8536.25',
];
class UserService extends Service {
  /**
   * 获取分类
   */
  async classification() {
    const { ctx } = this;
    const num = Math.floor(Math.random() * (36 - 1) + 1);
    const result = await Promise.all([
      ctx.curl(api.classification, {
        // 3 秒超时
        timeout: 10000,
        dataType: 'json',
        headers: {
          'User-Agent': user_agent[num],
          Cookie:
            '_ga=GA1.2.2018318027.1545703594; UM_distinctid=167e36e91f3442-01b8e961be8ee2-35637600-1fa400-167e36e91f51e7',
        },
      }),
      this.findClassification(),
    ]);
    const classification = [];
    delete result[0].data.ok; // 删除ok的操作
    try {
      const urlclassification = result[0].data;
      for (const key of Object.keys(urlclassification)) {
        urlclassification[key].forEach((e) => {
          classification.push({
            classification: key,
            major: e.major,
            mins: e.mins.join(','),
            state: 1,
          });
        });
      }
      const findClassification = result[1];
      // 获取数据库没有的列表
      const addClassification = classification.filter(
        (item) => !findClassification.some((ele) => ele.major === item.major)
      );
      // 修改没有的列表
      const updateClassification = findClassification.filter((item) =>
        classification.some((ele) => ele.major === item.major && ele.mins !== item.mins)
      );
      // 插入
      if (addClassification.length) {
        await this.createClassification(addClassification);
      }
      // 更新
      if (updateClassification.length) {
        await this.createClassification(addClassification);
      }
      return urlclassification;
    } catch (err) {
      ctx.logger.error(err);
      return [];
    }
  }
  /**
   *
   * @param {Object} query
   * gender: 男生:mael 女生:female 出版:press
   * type: 热门:hot 新书:new 好评:repulation 完结: over 包月: month
   * major: 大类别 从接口1获取
   * minor: 小类别 从接口4获取 (非必填)
   * start: 分页开始页
   * limit: 分页条数
   */
  async novellist(query) {
    const { ctx } = this;
    try {
      const num = Math.floor(Math.random() * (36 - 1) + 1);
      const result = await Promise.all([
        ctx.curl(api.categories, {
          // 3 秒超时
          timeout: 10000,
          dataType: 'json',
          data: query,
          headers: {
            'User-Agent': user_agent[num],
            Accept:
              'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
            'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
            Cookie:
              '_ga=GA1.2.2018318027.1545703594; UM_distinctid=167e36e91f3442-01b8e961be8ee2-35637600-1fa400-167e36e91f51e7',
          },
        }),
        this.findbook({ major: query.major }),
      ]);
      const data = result[0].data;
      if (data.total < 1) {
        ctx.logger.error(
          '获取书本报错了' + api.categories,
          user_agent[num],
          query,
          result[0].headers
        );
      }
      const ayascBoook = data.books.map((res) => {
        return {
          path: res._id,
          title: res.title,
          majorCate: res.majorCate,
          lastChapter: res.lastChapter,
          minorCate: res.minorCate,
          tags: res.tags.join(','),
          author: res.author,
          shortIntro: res.shortIntro,
          update: false,
          state: 1,
          cover: 'http://statics.zhuishushenqi.com' + res.cover,
        };
      });
      const book = result[1];
      data.books = ayascBoook;
      return data;
    } catch (err) {
      return { message: '报错啦：' + err, status: -1 };
    }
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
    const result = await ctx.curl(query, {
      // 3 秒超时
      timeout: 3000,
      dataType: 'json',
    });
    return result.data;
  }
  /**
   * 查找所有分类数据
   */
  async findClassification() {
    const { ctx } = this;
    return await ctx.model.Bookclassification.findAll();
  }
  /**
   * 插入所有分类数据
   */
  async createClassification(data) {
    const { ctx } = this;
    return await ctx.model.Bookclassification.bulkCreate(data).then((res) => {
      return res;
    });
  }
  /**
   * 修改有所改动的分类数据
   */
  async updateClassification(data) {
    const { ctx } = this;
    return await ctx.model.Bookclassification.bulkCreate(data).then((res) => {
      return res;
    });
  }
  /**
   * 查找所有书本
   */
  async findbook(data) {
    const { ctx } = this;
    return await ctx.model.Bookclassification.findAll({ where: data });
  }
  /**
   * 插入所有书本数据
   */
  async createBook(data) {
    const { ctx } = this;
    return await ctx.model.Book.bulkCreate(data).then((res) => {
      return res;
    });
  }
  /**
   * 修改有所改动的书本数据
   */
  async updateBook(data) {
    const { ctx } = this;
    return await ctx.model.Book.bulkCreate(data).then((res) => {
      return res;
    });
  }
  /**
   * 查找书本的章节
   */
  async findMenu(data) {
    const { ctx } = this;
    return await ctx.model.Bookmenu.findAll({ where: data });
  }
  /**
   * 插入书本的章节
   */
  async createMenu(data) {
    const { ctx } = this;
    return await ctx.model.Bookmenu.bulkCreate(data);
  }
  /**
   * 随机整数
   * @param {int} n 开始
   * @param {int} m 结束
   */
  rnd(n, m) {
    const random = Math.floor(Math.random() * (m - n + 1) + n);
    return random;
  }
}

module.exports = UserService;
