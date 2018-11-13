import Vue from 'vue';

import VueRouter from 'vue-router';

import homeView from './home/index';
import loginView from './login/index';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: '/admin',
  routes: [
    {
      path: '',
      component: homeView
    },
    {
      path: '/login',
      component: loginView
    },
  ]
});

export default router;
