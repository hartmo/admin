<template>
  <div class="p-r">
    <div class="p-r">
      <span class="el-icon-plus add"
            @click="add"></span>
            <center><h1 @click="init"><span>预测：{{guess1(0).newvalue?'双':'单'}}</span><span class="refresh">刷新</span></h1></center>
      <m-table v-model="list"
               style="width: 100%">
        <el-table-column label="a1"
                         width="250">
          <template slot-scope="scope">
            {{scope.row.a1}} + {{scope.row.a2}} + {{scope.row.a3}} = {{total(scope.row)}}
          </template>
        </el-table-column>
        <!-- <el-table-column prop="a2"
                         label="结果"
                         width="300">
          <template slot-scope="scope">
            预算结果：{{guess(scope.$index).total}}
          </template>
        </el-table-column> -->
        <el-table-column prop="a2"
                         label="A2"
                         width="300">
          <template slot-scope="scope">
            <el-tag v-for="(item,index) in guesscheck(scope.$index)"
                    :key="index"
                    style="margin-left:10px;"
                    :type="item.chuck ? 'success' : 'danger'"
                    disable-transitions>{{item.value}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="a3"
                         :label="'成功率：'+successRate+'%'">
          <template slot-scope="scope">
            预测结果为：{{guess1(scope.$index).value?'双':'单'}}
            <el-tag style="margin:0 10px;"
                    :type="guess1(scope.$index).newvalue === guess1(scope.$index).value? 'success' : 'danger'"
                    disable-transitions>{{guess1(scope.$index).newvalue ? '双':'单'}}</el-tag>
                    {{guess1(scope.$index).modulo}}
          </template>
        </el-table-column>
      </m-table>

    </div>
    <el-dialog title="提示"
               :visible.sync="dialogVisible"
               width="30%">
      <el-form :model="formula"
               :rules="rules"
               ref="ruleForm"
               label-width="100px"
               class="demo-ruleForm">
        <el-form-item label="A1"
                      prop="a1">
          <el-input placeholder="请输入数字"
                    v-model="formula.a1"
                    type="number"
                    class="input-with-select">
          </el-input>
        </el-form-item>
        <el-form-item label="A2"
                      prop="a2">
          <el-input placeholder="请输入数字"
                    v-model="formula.a2"
                    type="number"
                    class="input-with-select">
          </el-input>
        </el-form-item>
        <el-form-item label="A3"
                      prop="a3">
          <el-input placeholder="请输入数字"
                    v-model="formula.a3"
                    type="number"
                    @keyup.enter.native="sure"
                    class="input-with-select">
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="sure">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<style lang="scss" rel="stylesheet/scss">
  @import "./index.scss";
</style>
<script type="text/babel">
  import vm from './vm';
  export default vm;
</script>