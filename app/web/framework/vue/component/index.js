import Vue from 'vue';

import Layout from 'component/layout/app';
import Mtable from 'component/table';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
Vue.component(Layout.name, Layout);
Vue.component(Mtable.name, Mtable);
