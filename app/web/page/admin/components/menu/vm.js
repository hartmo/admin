export default {
  name: 'm-menu',
  mounted() {
    this.init();
  },
  created() {},
  watch: {},
  data() {
    return {
      height: '968px',
      menuList: [{
        title: '首页',
        path: '/admin',
        icon: 'el-icon-loading',
      },
      {
        title: '权限管理',
        path: 'sysManage',
        icon: 'el-icon-loading',
        children: [{
          title: '用户管理',
          path: '/admin/user',
          icon: 'el-icon-loading',
        }]
      }
      ]
    };
  },
  components: {},
  computed: {},
  methods: {
    init() {
      this.height = document.body.clientHeight + 'px';
    },
    handleSelect(key, keyPath) {
      this.$router.push({
        path: key
      });
    },
  },
};