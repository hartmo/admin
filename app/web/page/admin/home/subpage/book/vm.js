export default {
  name: 'book',
  mounted() {
    this.init();
  },
  watch: {},
  data() {
    return {
      classification: {},
      outerVisible: false,
      activeNames: [ 1 ],
      pagination: {
        sizes: [ 20, 50, 100, 150 ],
        limit: 20,
        page: 0,
        total: 0,
      },
      moreMenu: false,
      bookDetails: {
        details: {},
        menu: {
          mixToc: {
            chapters: [],
          },
        },
      },
      books: {
        books: [],
      },
      searchList: {
        start: 0,
        limit: 20,
        major: '',
        type: 'hot',
      },
    };
  },
  components: {},
  computed: {
    chapters() {
      console.log(this.bookDetails.menu.mixToc.chapters);
      return this.moreMenu
        ? this.bookDetails.menu.mixToc.chapters
        : this.bookDetails.menu.mixToc.chapters.slice(0, 29);
    },
  },
  methods: {
    init() {
      this.$http.get('/book/classification').then(({ data }) => {
        delete data.data.ok;
        this.classification = data.data;
      });
    },
    handleSelect(key, keyPath) {
      this.searchList.gender = keyPath[0];
      this.searchList.major = keyPath[1];
      if (keyPath.length === 3 && keyPath[1] !== keyPath[2]) {
        this.searchList.minor = keyPath[2];
      } else {
        this.searchList.minor = '';
      }
      this.getlist(this.searchList);
    },
    getlist(data) {
      this.$http.post('/book/novellist', data).then(({ data }) => {
        this.pagination.total = data.data.total + this.pagination.limit;
        this.books = data.data;
      });
    },
    handleCurrentChange(current) {
      this.pagination.page = current - 1;
      this.searchList.start = current - 1;
      this.getlist(this.searchList);
    },
    handleSizeChange(limit) {
      this.pagination.limit = limit;
      this.searchList.limit = limit;
      this.searchList.start = 0;
      this.getlist(this.searchList);
    },
    handleClick(row) {
      this.$http.post('/book/bookDetails', { id: row._id }).then(({ data }) => {
        this.bookDetails = data;
        this.outerVisible = true;
        this.moreMenu = false;
      });
    },
    /**
     * 阅读章节
     */
    chapter(link) {
      this.$http.post('/book/chapterup', { link }).then(({ data }) => {
        console.log(data);
      });
    },
    addBook() {
      this.outerVisible = false;
    },
  },
};
