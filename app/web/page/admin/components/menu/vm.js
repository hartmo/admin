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
    };
  },
  components: {},
  computed: {},
  methods: {
    init() {
      this.height = document.body.clientHeight + 'px';
    },
    handleSelect(key, keyPath) {
      this.$router.push({ path: key });
    },
  },
};
