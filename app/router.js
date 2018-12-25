module.exports = app => {
  app.get('/', app.controller.admin.index.index);
  app.get('/admin*', app.controller.admin.index.index);
  app.get('/api/epub/list', app.controller.epub.index.list);
  app.post('/api/epub/upload', app.controller.epub.index.upload);
  require('./router/admin/book')(app); // 占用 '/api/book' 目录
};
