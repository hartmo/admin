import canvasView from './canvas/index';
export default {
  name: 'login',
  mounted() {},
  watch: {},
  data() {
    return {
      loginValidateForm: {
        name: null,
        password: null,
      },
    };
  },
  components: {
    canvasView,
  },
  computed: {},
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.loginValidateForm);
          // src.post(api.login, this.loginValidateForm).then((res) => {
          // 	if (res.status !== 10000) {
          // 		this.$message.error(res);
          // 	} else {
          // 		let model: Usermodel = res.data;
          // 		sessionStorage.setItem('key', model.token);
          // 		sessionStorage.setItem('account', JSON.stringify(res.data));
          // 		this.$message.success(res.msg);
          // 		this.$router.push({ path: '/index' });
          // 	}
          // });
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
