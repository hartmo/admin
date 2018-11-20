<template>
  <app-layout>
    <transition name="fade"
                mode="out-in">
      <router-view></router-view>
    </transition>
  </app-layout>
</template>
<script type="text/babel">
  import vm from './app';
  export default vm;
</script>
