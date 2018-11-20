<template>
  <app-layout>
    <transition name="fade"
                mode="out-in">

      <el-container class="home-warp">
        <el-aside width="200px"
                  style="background-color: rgb(238, 241, 246)">
          <menu-view></menu-view>
        </el-aside>
        <el-container>
          <div class="home-box">
            <header-view></header-view>
            <div class="m-20">
              <router-view></router-view>
            </div>
          </div>
        </el-container>
      </el-container>
    </transition>
  </app-layout>
</template>

<style lang="scss" rel="stylesheet/scss">
  @import './index.scss';
</style>
<script type="text/babel">
  import vm from './vm';
  export default vm;
</script>