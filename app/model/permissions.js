module.exports = (app) => {
  const { STRING, INTEGER, DATE, TEXT } = app.Sequelize;
  const Users = app.model.define('users', {
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
  return Users;
};
