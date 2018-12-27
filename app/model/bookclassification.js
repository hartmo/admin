module.exports = (app) => {
  const { STRING, INTEGER, DATE, TEXT, BOOLEAN } = app.Sequelize;
  const Bookclassification = app.model.define('bookclassification', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    classification: {
      type: STRING(100),
    },
    major: {
      type: STRING(100),
    },
    mins: TEXT,
    state: INTEGER,
  });
  return Bookclassification;
};
