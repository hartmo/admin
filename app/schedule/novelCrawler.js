const Subscription = require('egg').Subscription;

class novelCrawlerCache extends Subscription {
  // 通过 schedule 属性来设置定时任务的执行间隔等配置
  static get schedule() {
    return {
      interval: '1h', // 5 min间隔
      // immediate: true,
      type: 'worker', // 指定所有的 worker 都需要执行
    };
  }

  // subscribe 是真正定时任务执行时被运行的函数
  async subscribe() {
    const { ctx } = this;
    if (!ctx.app.cache) {
      console.log('开始执行爬取任务');
      const classification = await this.getclassification();
      ctx.app.cache = { classification };
      this.subscribe();
    } else {
      const classification = ctx.app.cache.classification;
      ctx.helper.mapLimit(classification, 1, (item) => {
        return new Promise((resolve) => {
          item.start = 0;
          this.getonebook(item, 0, () => {
            resolve();
          });
        }).then((reason) => {
          this.subscribe();
        });
      });
      // for (const i in classification) {
      //   if (!classification[i].hasCrawler) {
      //     classification[i].start = 0;
      //     classification[i].hasCrawler = true;
      //     this.getonebook(classification[i], 0);
      //     break;
      //   }
      // }
    }
  }
  /**
   * 获取书籍目录信息
   */
  async getclassification() {
    const { ctx } = this;
    const data = [];
    return await ctx.service.admin.bookapi.classification().then((res) => {
      delete res.ok;
      for (const key of Object.keys(res)) {
        res[key] = res[key].map((ret) => {
          data.push({
            major: ret.major,
            key,
            hasCrawler: false,
          });
          return {
            major: ret.major,
            key,
            hasCrawler: false,
          };
        });
      }
      return data;
    });
  }
  async getonebook(item, number, callback) {
    const { ctx } = this;
    let page = await ctx.service.admin.bookapi
      .novellist({
        gender: item.key,
        type: 'hot',
        major: item.major,
        start: item.start,
        limit: 30,
      })
      .then((res) => {
        return Math.ceil(Number(res.total) / 30);
      });
    page = page || 30000; // 获取分页数量
    const bookListNum = []; // 获取爬去书本的页码
    for (let i = 1; i < page; i++) {
      if (!item.major) {
        break;
      }
      bookListNum.push({
        major: item.major,
        start: i,
        key: item.key,
      });
    }
    this.limlt(bookListNum, item.total, item.major, () => {
      callback();
    });
    ctx.logger.error('--------------找到需要录入的分类' + item.major + '页数：' + bookListNum.length);
  }
  async limlt(bookListNum, total, major, callback) {
    const { ctx } = this;
    let bookList = []; // 获取爬去书本的页码
    const erroList = [];
    const databook = await ctx.service.admin.bookapi.findbook({ major });
    ctx.helper
      .mapLimit(bookListNum, 4, (item) => {
        return new Promise((resolve) => {
          const time = Math.floor(Math.random() * (10 - 1) + 1) * 1000;
          setTimeout(() => {
            this.getbook(item, 0)
              .then((data) => {
                bookList = bookList.concat(data);
                ctx.service.admin.bookapi.createBook(data).then((adddata) => {
                  console.log('本次完成插入：' + adddata.length);
                  console.log(
                    '本次获取的是' +
                      item.major +
                      '获取的页面:' +
                      Number(item.start) +
                      '共获取了:' +
                      data.length +
                      '目前共获得：' +
                      bookList.length
                  );
                  resolve(data);
                });
              })
              .catch((e) => {
                erroList.push(e);
                resolve([]);
              });
          }, time);
        });
      })
      .then((response) => {
        if (erroList.length > 0) {
          this.limlt(erroList, erroList.length, major, callback);
        }
        if (Number(total) < Number(bookList.length)) {
          ctx.logger.error('丢失了' + Number(total) - Number(bookList.length) + '本书');
          console.log('丢失了' + Number(total) - Number(bookList.length) + '本书');
        } else if (Number(total) === Number(bookList.length)) {
          console.log('已完成获取本次' + major + '类型的书籍');
          ctx.logger.error(
            '---------------------------------------------------------------------------已完成获取本次' +
              major +
              '类型的书籍共：' +
              bookList.length +
              '实际上是' +
              total
          );
        }
        const addBook = bookList.filter(
          (item) =>
            !databook.some(
              (ele) => ele.title === item.title && ele.author === item.author
            )
        );
        ctx.service.admin.bookapi.createBook(addBook).then((adddata) => {
          console.log('本次完成插入：' + adddata.length);
          callback();
        });
      });
  }
  /**
   * 获取书本
   */
  async getbook(item, num) {
    const { ctx } = this;
    return new Promise((resolve, reject) => {
      console.log(item);
      console.log('----------------------------');
      ctx.service.admin.bookapi
        .novellist({
          gender: item.key,
          type: 'hot',
          major: item.major,
          start: item.start,
          limit: 30,
        })
        .then((res) => {
          if (res.books.length === 0) {
            console.log('页面' + item.start + '获取失败,第' + num + '次');
            console.log('书籍' + item.major + '获取失败', res);
            ctx.logger.error('书籍' + item.major + '获取,失败,第' + item.start + '页', res);
            reject(item);
            return;
          }
          resolve(res.books);
        })
        .catch((e) => {
          console.log('书籍获取失败' + item.start + '页' + item.major + '第' + num + '次');
          ctx.logger.error('书籍' + item.major + '获取,失败,第' + item.start + '页', e);
          reject(item);
        });
    });
  }
}

module.exports = novelCrawlerCache;
