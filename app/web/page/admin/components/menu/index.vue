<template>
  <el-aside class="m-menu"
            ref="menuView"
            :style="{'height':height}">
    <el-menu :default-openeds="['1']"
             @select="handleSelect"
             :class="[{'collapse-view':!isCollapse}]"
             background-color="#545c64"
             text-color="#fff"
             active-text-color="#ffd04b"
             :collapse="isCollapse">
      <el-menu-item index="collapse" :class="[{'el-icon-arrow-right':isCollapse},{'el-icon-arrow-left':!isCollapse}]"></el-menu-item>
      <el-menu-item :index="item.path"
                    v-for="(item,index) in menuList"
                    :key="index">
        <i class="icon" :class="item.icon"></i>
        <span>{{item.title}}</span>
      </el-menu-item>
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
