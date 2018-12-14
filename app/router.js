module.exports = app => {
  app.get('/', app.controller.admin.index.index);
  app.get('/admin*', app.controller.admin.index.index);
  app.get('/epub', app.controller.epub.index.index);
  app.post('/epub/upload', app.controller.epub.index.upload);
  // require('./router/admin/user')(app); // 占用 '/admin/user' 目录
};
