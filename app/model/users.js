module.exports = (app) => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const users = app.model.define('users', {
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
    lastdate: DATE,
  });

  return users;
};
