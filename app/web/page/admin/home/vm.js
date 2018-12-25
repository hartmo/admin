
import menuView from '../components/menu/index';
import headerView from '../components/header/index';
import VueRouter from 'vue-router';
import router from './router';
export default {
  name: 'index',
  router,
  mounted() {
    this.height = document.body.clientHeight - 100 + 'px';
  },
  watch: {},
  data() {
    return {
      height: '987px'
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
