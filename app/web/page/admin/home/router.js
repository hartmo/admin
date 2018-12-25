import Vue from 'vue';

import VueRouter from 'vue-router';

import homeView from './subpage/index/index';
import epubView from './subpage/epub/index';
import bookView from './subpage/book/index';

Vue.use(VueRouter);
const router = new VueRouter({
  mode: 'history',
  base: '/admin',
  routes: [
    {
      path: '/',
      component: homeView,
      title: '首页',
      icon: 'el-icon-menu'
    },
    {
      path: '/epub',
      component: epubView,
      title: '小说阅读',
      icon: 'el-icon-menu'
    },
    {
      path: '/book',
      component: bookView,
      title: '追书神器',
      icon: 'el-icon-tickets'
    },
  ],
});

export default router;
