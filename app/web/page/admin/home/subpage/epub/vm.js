import { loadEpubJs, readBook } from 'asset/js/asyncLoadJs.js';
export default {
  name: 'epub',
  mounted() {
    loadEpubJs().then(() => {
      this.init();
    });
  },
  watch: {},
  data() {
    return {
      epublist: [],
    };
  },
  components: {},
  computed: {},
  methods: {
    init() {
      this.$http.get('/epub/list').then(({ data }) => {
        this.epublist = data.data;
      });
    },

    handlePreview(file) {
      console.log(file);
    },
    onSuccess(file) {},
    beforeAvatarUpload(file) {
      return true;
    },
    uploadSuccess(response, file, fileList) {
      console.log('file', file);
      console.log('response', response);
      console.log('fileList', fileList);
    },
  },
};
