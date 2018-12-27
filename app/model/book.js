module.exports = (app) => {
  const { STRING, INTEGER, DATE, TEXT, BOOLEAN } = app.Sequelize;
  const Book = app.model.define('book', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: STRING(100),
    },
    author: {
      type: STRING(100),
    },
    lastChapter: STRING(100),
    shortIntro: {
      type: TEXT,
    },
    cover: TEXT,
    longIntro: TEXT,
    path: {
      type: STRING(200),
    },
    tags: TEXT,
    majorCate: STRING(100),
    minorCate: STRING(100),
    update: BOOLEAN,
    date: DATE,
    state: INTEGER,
    update_at: DATE,
    created_at: DATE,
  });
  return Book;
};
