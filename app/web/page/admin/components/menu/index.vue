<template>
  <el-aside width="200px" class="m-menu" ref="menuView" :style="{'height':height}">
    <el-menu
      :default-active="$route.path"
      @select="handleSelect"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
    >
      <div v-for="(item,index) in menuList" :key="index">
        <el-menu-item
          :index="item.path"
          v-if="!item.children || item.children && item.children.length===0"
        >
          <i :class="item.icon"></i>
          {{item.title}}
        </el-menu-item>
        <el-submenu :index="item.path" v-else>
          <template slot="title">
            <i :class="item.icon"></i>
            {{item.title}}
          </template>
          <template v-if="item.children && item.children.length">
            <el-menu-item :index="children.path" v-for="(children,key) in item.children" :key="key">
              <i :class="children.icon"></i>
              {{children.title}}
            </el-menu-item>
          </template>
        </el-submenu>
      </div>
    </el-menu>
  </el-aside>
</template>
<style lang="scss">
@import "index.scss";
</style>
<script type="text/babel">
import vm from "./vm";
export default vm;
</script>
