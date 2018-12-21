const Service = require('egg').Service;
const moment = require('moment');
const iconv = require('iconv-lite');
const cheerio = require('cheerio');
class getHtmlService extends Service {
  async index(url, options, format) {
    const { ctx } = this;
    // const headers = ctx.headers();
    options.headers = Object.assign(options, {});
    const result = await ctx.curl(url, options);
    const html = iconv.decode(result.res.data, format);
    const $ = cheerio.load(html, { decodeEntities: false });
    return $;
  }
}
module.exports = getHtmlService;
