'use strict';

module.exports = app => {
  const { router } = app;
  router.get('/api/book/classification', app.controller.book.index.classification); // 获取分类
  router.post('/api/book/novellist', app.controller.book.index.novellist); // 获取小说列表
  router.post('/api/book/bookDetails', app.controller.book.index.bookDetails); // 获取小说详情和列表
  router.post('/api/book/chapterup', app.controller.book.index.chapterup); // 获取章节内容
};