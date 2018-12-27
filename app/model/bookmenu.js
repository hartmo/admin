module.exports = (app) => {
  const { STRING, INTEGER, DATE, TEXT } = app.Sequelize;
  const Bookmenu = app.model.define('bookmenu', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    order: INTEGER,
    title: STRING(100),
    bookId: {
      type: STRING(100),
    },
    content: {
      type: TEXT,
    },
    date: DATE,
    state: INTEGER,
    update_at: DATE,
    created_at: DATE,
  });
  return Bookmenu;
};
