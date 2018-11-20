module.exports = app => {
  app.get('/', app.controller.admin.index.index);
  app.get('/admin*', app.controller.admin.index.index);
  // require('./router/admin/user')(app); // 占用 '/admin/user' 目录
};
