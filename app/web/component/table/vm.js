const axios = require('axios');
export default {
  name: 'm-table',
  mounted() {
  },
  data() {
    return {
      current: {
        currentPage: 1,
        pageSizes: 10,
        total: 0,
      },
    };
  },
  watch: {
  },
  components: {},
  computed: {
    tableArr() {
      this.current.total = this.value.length;
      const start = this.current.currentPage - 1 > 0 ? this.current.currentPage - 1 : 0;
      return this.value.slice(
        start * this.current.pageSizes,
        this.current.currentPage * this.current.pageSizes
      );
    },
  },
  methods: {
    handleSizeChange(val) {
      this.current.pageSizes = val;
    },
    handleCurrentChange(val) {
      this.current.currentPage = val;
    },
  },
  props: {
    value: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
};
