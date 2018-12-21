export default {
  name: 'pcegg',
  mounted() {
    this.init();
  },
  watch: {},
  data() {
    return {
      epublist: [],
      dialogVisible: false,
      formula: {},
      successRate: 0,
      list: [],
      rules: {
        a1: [ { required: true, message: '不能为空', trigger: 'blur' } ],
        a2: [ { required: true, message: '不能为空', trigger: 'blur' } ],
        a3: [ { required: true, message: '不能为空', trigger: 'blur' } ],
      },
    };
  },
  components: {},
  computed: {},
  methods: {
    init() {
      this.$http.post('/pcegg/list').then(({ data }) => {
        this.list = data.data.result.map((obj) => {
          return {
            issue: obj.issue,
            time: obj.time,
            a1: obj.val[0],
            a2: obj.val[1],
            a3: obj.val[2],
          };
        });
        this.initdata();
      });
    },
    initdata() {
      const num = 0;
      let successnum = 0;
      this.list.forEach((res, index) => {
        const obj = this.guess1(index);
        if (index < 10 && obj.value === obj.newvalue) {
          successnum = successnum + 1;
        }
      });
      this.successRate = Number((successnum / 10 * 100).toFixed(2));
    },
    total(row) {
      if (!row && !row.a1) {
        return 0;
      }
      return Number(row.a1) + Number(row.a2) + Number(row.a3);
    },
    guesscheck(index) {
      const guess = this.guess(index);
      const result = [];
      if (!guess.total && !guess.total) {
        return result;
      }
      const parity = guess.total % 2 === 0;
      const newParity = guess.newtotal % 2 === 0;
      const size = guess.total > 13; // 预测结果大小
      const newsize = guess.newParity > 13; // 开奖结果大小
      let value = '';
      let chuck = false;
      switch (size) {
        case size && parity === true:
          value = '大双';
          chuck = newParity === newsize;
          break;
        case !size && parity:
          value = '小双';
          chuck = !newParity === newsize;
          break;
        case size && !parity:
          value = '大单';
          chuck = newParity === !newsize;
          break;
        case !size && !parity:
          value = '小单';
          chuck = !newParity === !newsize;
          break;
        default:
          value = '';
          chuck = false;
      }
      result.push({ chuck: parity === newParity, value: parity ? '双' : '单' });
      result.push({ chuck: size === newsize, value: size ? '大' : '小' });
      if (value) {
        result.push({
          chuck: parity === newParity && size === newsize,
          value,
        });
      }
      return result;
    },
    guess(index) {
      const result = [];
      const arr = this.list.slice(index + 1, index + 4);
      if (arr.length < 3) {
        return 0;
      }
      const B4 = arr[1].a1 + arr[1].a2 + arr[1].a3;
      const C4 = arr[2].a1 + arr[2].a2 + arr[2].a3;
      let A1 = String(C4 + arr[2].a2 + arr[1].a2).split('');
      let A2 = String(arr[0].a1 + arr[1].a1 + arr[2].a1).split('');
      let A3 = String(arr[0].a2 + B4 + arr[2].a1).split('');
      A1 = A1.length > 1 ? A1[1] : A1[0];
      A2 = A2.length > 1 ? A2[1] : A2[0];
      A3 = A3.length > 1 ? A3[1] : A3[0];
      const total = Number(A1) + Number(A2) + Number(A3);
      let newtotal = 0;
      if (this.list[index]) {
        newtotal = this.total(this.list[index]);
      }
      return { total, newtotal };
    },
    guess1(index) {
      const obj = {};
      if (index < 0) {
        return obj;
      }
      const result = [];
      const arr = this.list.slice(index + 1, index + 4);
      let newtotal = 0;
      if (this.list[index]) {
        newtotal = this.total(this.list[index]);
      }
      let total = 0;
      if (arr.length < 3) {
        return obj;
      }
      arr.forEach((res) => {
        total += Math.max(res.a1, res.a2, res.a3);
      });
      obj.value = total % 2 === 0;
      obj.newvalue = newtotal % 2 === 0;
      obj.modulo = parseInt(newtotal / 3) + '余' + newtotal % 3;
      return obj;
    },
    add() {
      this.dialogVisible = true;
      this.formula = {};
      this.$refs.ruleForm.resetFields();
    },
    sure() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.dialogVisible = false;
          this.list.unshift(this.formula);
        }
      });
    },
  },
};
