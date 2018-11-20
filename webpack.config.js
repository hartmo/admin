'use strict';
const path = require('path');
const fs = require('fs');
// 允许值加载某几个 entry
let exclude = [];
if (process.env.WEBPACK_ENTRY) {
  // 如果是 none ，则允许只 load home
  const webpackEntries = process.env.WEBPACK_ENTRY === 'none'
    ? []
    : process.env.WEBPACK_ENTRY.split(',');

  const entries = webpackEntries.concat([ 'home', 'error' ]).map(d => d.trim());
  const dirList = fs.readdirSync(path.resolve(__dirname, './app/web/page'));
  exclude = dirList.filter(d => !entries.includes(d)).map(d => `app/web/page/${d}`);
}
module.exports = {
  egg: true,
  framework: 'vue',
  entry: {
    include: 'app/web/page/',
    exclude: ['app/web/page/[a-z]+/(components?|subpage|router|store)'].concat(exclude),
  },
  alias: {
    app: 'app/web/framework/vue/app.js',
    asset: 'app/web/asset',
    component: 'app/web/component',
    framework: 'app/web/framework',
    store: 'app/web/store',
    vue: 'vue/dist/vue.esm.js',
  },
  dll: ['vue', 'axios', 'vue-router', 'vuex', 'vuex-router-sync'],
  loaders: {},
  plugins: {},
  done() {

  }
};