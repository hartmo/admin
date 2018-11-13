import { sync } from 'vuex-router-sync';
import store from 'store/app';
import router from './router';
import app from './app.vue';
import App from 'app';
sync(store, router);

export default App.init({
  base: '/admin',
  ...app,
  router,
  store,

  mounted() {
    console.log(this.$route);
  },
});
