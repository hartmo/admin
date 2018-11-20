<template>
  <div class="login-canvas">
    <canvas ref="canvas" :width="width" :height="height"></canvas>
  </div>
</template>

<style lang="scss" rel="stylesheet/scss">
  @import './index.scss';
</style>
<script type="text/babel">
  import vm from './vm';
  export default vm;
</script>