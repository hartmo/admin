'use strict';

module.exports = app => {
  const { router } = app;
  router.get('admin/user/findAll', app.controller.admin.user.findAll);
};