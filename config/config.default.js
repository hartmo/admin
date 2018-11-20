const path = require('path');
const fs = require('fs');
module.exports = app => {
  const exports = {};

  // exports.siteFile = {
  //   '/favicon.ico': fs.readFileSync(path.join(app.baseDir, 'app/web/asset/images/favicon.ico'))
  // };
  exports.view = {
    cache: false
  };

  exports.vuessr = {
    layout: path.join(app.baseDir, 'app/web/lib/layout/index.html'),
    crossorigin: 'anonymous',
    renderOptions: {
      runInNewContext: 'once',
      basedir: path.resolve(app.baseDir, 'app/view'),
    },
  };

  exports.logger = {
    consoleLevel: 'DEBUG',
    dir: path.join(app.baseDir, 'logs')
  };

  exports.static = {
    prefix: '/public/',
    dir: path.join(app.baseDir, 'public')
  };
  exports.security = {
    csrf: false,
    ctoken: false
  };
  exports.keys = '123456';

  exports.middleware = ['access'];

  exports.sequelize = {
    // egg-sequelize 配置
    dialect: 'mysql', // db type
    database: 'admin',
    host: 'localhost',
    port: '3306',
    username: 'root',
    password: 'admin520'
  };
  return exports;
};
