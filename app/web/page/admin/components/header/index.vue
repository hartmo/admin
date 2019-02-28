<template>
  <el-header class="m-header">
    <span style="margin-right: 15px">王小虎</span>
    <el-dropdown class="header-icon">
      <i class="el-icon-setting"></i>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>查看</el-dropdown-item>
        <el-dropdown-item>新增</el-dropdown-item>
        <el-dropdown-item>删除</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-header>
</template>
<style lang="scss">
@import "index.scss";
</style>
<script type="text/babel">
import vm from "./vm";
export default vm;
</script>
