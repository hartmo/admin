export default {
  name: 'index',
  mounted() {
    this.init();
  },
  watch: {},
  data() {
    return {
      indexDate: [],
      dialog: {
        title: '新增用户',
        dialogFormVisible: false,
        form: {
        },
      },
    };
  },
  components: {},
  computed: {},
  methods: {
    init() {
      this.$http.get('/admin/user/findAll').then(({ data }) => {
        this.indexDate = data;
      });
    },
    add() {
      this.dialog.form = {};
      this.dialogFormVisible(true);
    },
    dialogFormVisible(boolean) {
      this.dialog.dialogFormVisible = boolean;
    },
    sure() {
      this.$refs.userValidateForm.validate((valid) => {
        if (valid) {
          this.dialogFormVisible(false);
        }
      });
    },
    handleEdit(row, index) {
      console.log(row);
    },
  },
};
