<template>
  <div>
    <el-table :data="tableArr"
              style="width: 100%">

      <el-table-column type="index"
                       label="序号"
                       width="50">
        <template slot-scope="scope">
          {{((current.currentPage -1) * current.pageSizes) + scope.$index + 1}}
        </template>
      </el-table-column>
      <slot></slot>
    </el-table>
    <el-pagination @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :current-page="current.currentPage"
                   :page-sizes="[10, 50, 300, 400]"
                   :page-size="current.pageSizes"
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="current.total">
    </el-pagination>
  </div>
</template>

<style lang="scss" rel="stylesheet/scss">
  @import "./index.scss";
</style>
<script type="text/babel">
  import vm from './vm';
  export default vm;
</script>