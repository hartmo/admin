export default {
  name: 'epub',
  mounted() {},
  watch: {},
  data() {
    return {};
  },
  components: {},
  computed: {},
  methods: {
    handlePreview(file) {
      console.log(file);
    },
    onSuccess(file) {},
    beforeAvatarUpload(file) {
      console.log(file.size / 1024 / 1024);
      console.log(file);
    },
    uploadSuccess(response, file, fileList) {
      console.log('file', file);
      console.log('response', response);
      console.log('fileList', fileList);
    },
  },
};
