import Vue from 'vue';

import VueRouter from 'vue-router';

import homeView from './home/index';
import loginView from './subpage/login/index';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: '/',
  routes: [{
    path: '/login',
    component: loginView
  }, {
    path: '/admin',
    redirect: '/admin',
    component: homeView,
    hidden: true,
    children: [{
      path: '/',
      meta: {
        title: 'home',
        icon: 'home'
      },
      component: () => import('./page/index/index')
    }, {
      path: 'user',
      meta: {
        title: 'home',
        icon: 'home'
      },
      component: () => import('./page/user/index')
    }]
  }]
});

export default router;