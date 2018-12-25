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
      isCollapse: false,
    };
  },
  components: {},
  computed: {
    menuList() {
      return this.$router.options.routes;
    },
  },
  methods: {
    init() {
      this.height = document.body.clientHeight + 'px';
    },
    handleSelect(key, keyPath) {
      if (key === 'collapse') {
        this.isCollapse = !this.isCollapse;
        return;
      }
      this.$router.push({ path: key });
    },
  },
};
