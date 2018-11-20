<template>
  <el-aside width="200px"
            class="m-menu"
            ref="menuView"
            :style="{'height':height}">
    <el-menu :default-openeds="['1']"
             @select="handleSelect"
             background-color="#191970"
             text-color="#fff"
             active-text-color="#ffd04b">
      <el-menu-item index="">首页</el-menu-item>
    </el-menu>
  </el-aside>
</template>
<style lang="scss">
  @import "index.scss";
</style>
<script type="text/babel">
  import vm from './vm';
  export default vm;
</script>
