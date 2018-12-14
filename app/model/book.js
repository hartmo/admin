module.exports = (app) => {
  const { STRING, INTEGER, DATE, TEXT } = app.Sequelize;
  const Book = app.model.define('book', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    path: TEXT,
    name: STRING(100),
    state: INTEGER,
    update_at: DATE,
    created_at: DATE,
  });
  return Book;
};
