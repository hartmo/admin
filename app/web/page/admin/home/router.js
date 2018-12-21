import Vue from 'vue';

import VueRouter from 'vue-router';

import homeView from './subpage/index/index';
import epubView from './subpage/epub/index';
import pceggView from './subpage/pcegg/index';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: '/admin',
  routes: [
    {
      path: '/',
      component: homeView,
    },
    {
      path: '/epub',
      component: epubView,
    },
    {
      path: '/pcegg',
      component: pceggView,
    },
  ],
});

export default router;
