const axios = require('axios');
export default {
  name: 'index',
  mounted() {
  },
  watch: {},
  data() {
    return {
    };
  },
  components: {},
  computed: {
    indexDate() {
      return this.$router.options.routes;
    }
  },
  methods: {},
};
