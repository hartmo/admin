'use strict';

// 创建 permissions 表
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING, TEXT } = Sequelize;
    await queryInterface.createTable('permissions', {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: STRING(100),
      permissions: TEXT,
      state: INTEGER,
      update_at: DATE,
      created_at: DATE,
    });
  },
  // 在执行数据库降级时调用的函数，删除 users 表
  down: async (queryInterface) => {
    await queryInterface.dropTable('permissions');
  },
};
