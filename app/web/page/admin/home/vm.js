
import menuView from '../components/menu/index';
import headerView from '../components/header/index';
import VueRouter from 'vue-router';
import router from './router';
export default {
  name: 'index',
  router,
  mounted() {
  },
  watch: {},
  data() {
    return {
    };
  },
  components: {
    menuView, headerView
  },
  computed: {
    indexDate() {
      return this.$router.options.routes;
    }
  },
  methods: {},
};
