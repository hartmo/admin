<template>
  <div class="p-r">
    <!-- 头部 start -->
    <el-menu default-active="1"
             class="el-menu-demo"
             mode="horizontal"
             @select="handleSelect">
      <el-submenu :index="key"
                  v-for="(val, key, index) in classification"
                  :key="index">
        <template slot="title">
          {{key==='male'?'男生小说':key==='female'?'女生小说':key==='picture'?'热门小说':'其他小说'}}
        </template>
        <template v-for="(item,index) in classification[key]">
          <el-submenu :index="item.major"
                      v-if="item.mins.length>0"
                      :key="index">
            <template slot="title">{{item.major}}</template>
            <el-menu-item :index="item.major">全部分类</el-menu-item>
            <el-menu-item :index="subitem"
                          v-for="(subitem,index1) in item.mins"
                          :key="index1">{{subitem}}</el-menu-item>
          </el-submenu>
          <el-menu-item :index="item.major"
                        :key="index"
                        v-else>{{item.major}}</el-menu-item>
        </template>
      </el-submenu>
    </el-menu>
    <!-- 头部end -->
    <!-- 表格 start -->
    <ul>
      <li v-for="(item,index) in books.books"
          :key="index">
        <div class="book-box"
             @click="handleClick(item)">
          <div class="flex">
            <img :src="books.host + item.cover"
                 alt="">
            <div class="right">
              <div class="title">{{item.title}}</div>
              <span class="author">作者：{{item.author}}</span>
              <span class="lastChapter">{{item.lastChapter}}</span>
              <div class="shortIntro p-t-10">{{item.shortIntro}}</div>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <!-- 表格 end -->
    <!-- 导航条 start -->
    <el-pagination @size-change="handleSizeChange"
                   class="m-pagination"
                   v-if="books.books.length"
                   @current-change="handleCurrentChange"
                   :current-page="pagination.page +1"
                   :page-sizes="pagination.sizes"
                   :page-size="pagination.limit"
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="pagination.total">
    </el-pagination>
    <!-- 导航条 end -->
    <!-- 书本信息 start -->
    <el-dialog title="书本详情"
               :visible.sync="outerVisible">
      <el-collapse v-model="activeNames">
        <el-collapse-item :title="bookDetails.details.title"
                          :name="1">
          <div>
            <span>作者：{{bookDetails.details.author}}</span>
            <span class="lastChapter">{{bookDetails.details.lastChapter}}</span>
          </div>
          <div class="shortIntro p-t-10">{{bookDetails.details.longIntro}}</div>
        </el-collapse-item>
        <el-collapse-item title="目录"
                          :name="2">
          <el-row :gutter="30">
            <el-col :span="8"
                    v-for="(item,index) in chapters"
                    :key="index">
              <div class="chapters"
                    @click="chapter(item.link)">{{item.title}}</div>
            </el-col>
            <el-col :span="8"
                    :offset="16">
              <div style="color:blue;"
                   @click="moreMenu = !moreMenu">{{moreMenu?'收起':'展开'}}</div>
            </el-col>
          </el-row>
        </el-collapse-item>
      </el-collapse>

      <div slot="footer"
           class="dialog-footer">
        <el-button @click="outerVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="addBook">下载</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<style lang="scss" rel="stylesheet/scss">
  @import "./index.scss";
</style>
<script type="text/babel">
  import vm from './vm';
  export default vm;
</script>