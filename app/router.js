module.exports = app => {
  app.get('/admin*', app.controller.admin.index.index);
};
