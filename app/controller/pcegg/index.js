const Controller = require('egg').Controller;
class AppController extends Controller {
  async index() {
    const { ctx } = this;
    const data = {};
    const option = {
      Cookie: 'UM_distinctid=1673f3fad5dc1-021bf08d1fbe5f-6e35087a-fa000-1673f3fad5e3ea; ASP.NET_SessionId=xc2kmntxq2nbpif3xruwee54; re.pceggs.com=computerid=; CLIENTKEY=0160-8539-5471; dateflagxyh=2018-12-18; CLIENTKEY_ShowLogin=4422-3428-2002; .ADWASPX7A5C561934E_PCEGGS=1DFB4515AF47FBAC25E7DCBA13153FAD1F1BBED414F9DE80C888E879212B46538C5324E7270EF4D16A16337A576BBB7DA1C3C920A4D5BAC37642E660A712ED9676D00D04C94CF5CB8C3E9BBBFDDF46AEF165FA17FF7208C70887747C0E5C95B2A13A5C0DC66725943A0E945ABD690403EA067A70CBD82092BCB22B6E730AD9C7D85C38E9; forever.pceggs.com=UserID=j5rYmli/7e4UvI6w3zLx6A==&Time=PEd8acZg/Ejc3XvCQgQQx8rF9MW/l/g3&Date=PEd8acZg/EgGCsc2aOlEhA==&Status=KAyeeDyZo6Y=; ckurl.pceggs.com=ckurl=http://www.pceggs.com/game/MobileGame.aspx; CNZZDATA1262695176=214932224-1542949573-%7C1545103553',
      Host: 'www.pceggs.com',
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36'
    };
    data.result = await ctx.service.getHtml.index('http://www.pceggs.com/play/pxya.aspx', option, 'utf-8').then($ => {
      const $list = $('#panel tr');
      const result = [];
      $list.each(function() {
        if ($(this).index() > 6 && $list.length - 2 > $(this).index()) {
          const issue = $(this).find('td').eq(0);
          const time = $(this).find('td').eq(1);
          let val = $(this).find('td').eq(2);
          val = val.html();
          const reg = /\([^\)]*\)/g;
          val = val.match(reg)[0].replace(/\(|\)|\'| /g, '');
          val = val.split('=')[0].split('+');
          const obj = {
            issue: issue.text(),
            time: time.text(),
            val,
          };
          result.push(obj);
        }
      });
      return result;
    });
    ctx.body = {
      data
    };
  }
}

module.exports = AppController;
