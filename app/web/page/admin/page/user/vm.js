export default {
  name: 'index',
  mounted() {
    console.log(this.$http.get);
  },
  watch: {},
  data() {
    return {
      indexDate: [],
    };
  },
  components: {},
  computed: {},
  methods: {
    handleEdit(row, index) {
      console.log(row);
    },
  },
};
