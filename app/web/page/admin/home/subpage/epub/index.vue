<template>
  <div class="p-r">
    <ul class="booklist">
      <!-- <li><img src="http://s0.hao123img.com/res/r/image/2016-04-14/2a3b604cdc47bdc4e2ffa252d31179d1.jpg" -->
      <!-- alt=""></li> -->
      <li>
        <el-upload class="add"
                   action="/api/epub/upload"
                   :on-preview="handlePreview"
                   multiple
                   drag
                   :on-success="uploadSuccess">
          <div class="el-icon-plus add"></div>
        </el-upload>
      </li>
    </ul>
    <div id="book-warp"></div>
  </div>
</template>

<style lang="scss" rel="stylesheet/scss">
  @import "./index.scss";
</style>
<script type="text/babel">
  import vm from './vm';
  export default vm;
</script>