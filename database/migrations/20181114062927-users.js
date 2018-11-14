'use strict';
// 创建 users 表
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING } = Sequelize;
    await queryInterface.createTable('users', {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: STRING(100),
      phone: STRING(100),
      sex: INTEGER,
      account: STRING(100),
      password: STRING(100),
      email: STRING(100),
      permissions: STRING(100),
      ip: STRING(100),
      state: INTEGER,
      session: STRING(100),
      lastlogin_at: DATE,
    });
  },
  // 在执行数据库降级时调用的函数，删除 users 表
  down: async (queryInterface) => {
    await queryInterface.dropTable('users');
  },
};
