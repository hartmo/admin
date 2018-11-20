import Vue from 'vue';

import VueRouter from 'vue-router';

import homeView from './subpage/index/index';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: '/admin/',
  routes: [
    {
      path: '/',
      component: homeView,
    },
  ],
});

export default router;
