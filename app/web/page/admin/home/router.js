import Vue from 'vue';

import VueRouter from 'vue-router';

import homeView from './subpage/index/index';
import userView from './subpage/user/index';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: '/admin/',
  routes: [
    {
      path: '/',
      component: homeView,
    },
    {
      path: '/user',
      component: userView,
    },
  ],
});

export default router;
