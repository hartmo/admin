<template>
  <m-table v-model="indexDate">
    <el-table-column prop="name"
                     label="姓名">
      <template slot-scope="scope">
        {{scope.row.name}}
      </template>
    </el-table-column>
    <el-table-column prop="sex"
                     label="性别">
      <template slot-scope="scope">
        {{scope.row.sex===2?'男':'女'}}
      </template>
    </el-table-column>
    <el-table-column prop="name"
                     label="登陆账号">
      <template slot-scope="scope">
        {{scope.row.name}}
      </template>
    </el-table-column>
    <el-table-column prop="name"
                     label="手机号码">
      <template slot-scope="scope">
        {{scope.row.name}}
      </template>
    </el-table-column>
    <el-table-column>
      <template slot-scope="scope">
        <el-button size="mini"
                   @click="handleEdit(scope.$index, scope.row)">重置密码</el-button>
        <el-button size="mini"
                   @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button size="mini"
                   type="danger"
                   @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </m-table>
</template>

<style lang="scss" rel="stylesheet/scss">
  @import './index.scss';
</style>
<script type="text/babel">
  import vm from './vm';
  export default vm;
</script>