'use strict';

module.exports = app => {
  const { router } = app;
  router.get('user/findAll', app.controller.admin.user.findAll);
};