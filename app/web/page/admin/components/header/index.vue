<template>
  <el-header class="m-header">
    <el-dropdown>
      <div class="header-icon">
        <i class="el-icon-setting"></i>
        <span class="user-name">momo</span>
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>修改密码</el-dropdown-item>
        <el-dropdown-item>退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-header>
</template>
<style lang="scss">
  @import "index.scss";
</style>
<script type="text/babel">
  import vm from './vm';
  export default vm;
</script>
