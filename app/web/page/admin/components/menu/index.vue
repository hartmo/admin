<template>
  <el-aside width="201px"
            class="m-menu"
            ref="menuView"
            :style="{'height':height}">
    <el-menu :default-openeds="['1']"
             @select="handleSelect"
             background-color="#209effcb"
             text-color="#fff"
             active-text-color="#fff">
      <el-menu-item index="">首页</el-menu-item>
      <el-menu-item index="/epub">小说阅读</el-menu-item>
      <el-menu-item index="/pcegg">公式计算</el-menu-item>
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
