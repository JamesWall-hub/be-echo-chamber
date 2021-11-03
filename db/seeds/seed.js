const db = require('../index')
const format = require('pg-format');

const seed = (data) => {

  const { articleData, commentData, topicData, userData } = data;

  console.log("SEEDING")

  return db.query(`DROP TABLE IF EXISTS comments;`)
  .then(()=>{
    return db.query(`DROP TABLE IF EXISTS articles;`)
  })
  .then(()=>{
    return db.query(`DROP TABLE IF EXISTS users;`)
  })
  .then(()=>{
    return db.query(`DROP TABLE IF EXISTS topics;`)
  })
  .then (()=>{
    // console.log("CREATING TOPICS TABLE")
    return db.query(`
      CREATE TABLE topics(
        slug VARCHAR PRIMARY KEY,
        description VARCHAR
      );`)
  })
  .then (()=>{
    // console.log("CREATING USERS TABLE")
    return db.query(`
      CREATE TABLE users (
        username VARCHAR PRIMARY KEY,
        avatar_url VARCHAR,
        name VARCHAR
      );`)
  })
  .then (()=>{
    // console.log("CREATING ARTICLES TABLE")
    return db.query(`
      CREATE TABLE articles(
        article_id SERIAL PRIMARY KEY,
        title VARCHAR,
        body VARCHAR,
        votes INT DEFAULT 0,
        topic VARCHAR REFERENCES topics (slug),
        author VARCHAR REFERENCES users(username),
        created_at TIMESTAMPTZ
      );`)
  })
  .then (()=>{
    // console.log("CREATING COMMENTS TABLE")
    return db.query(`
      CREATE TABLE comments(
        comment_id SERIAL PRIMARY KEY,
        author VARCHAR REFERENCES users(username) NOT NULL,
        article_id INT REFERENCES articles(article_id),
        votes INT DEFAULT 0,
        created_at TIMESTAMPTZ,
        body VARCHAR
      );`)
  })
  .then(() => {
    // console.log("INSERTING TOPICS")
      const queryStr = format(`
      INSERT INTO topics(
        slug,
        description
      )
        VALUES
        %L;`, topicData.map((topic) => {
          return[
            topic.slug,
            topic.description
          ];
        })
      )
  return db.query(queryStr)
  })
  .then(() => {
    // console.log("INSERTING USERS")
      const queryStr = format(`
      INSERT INTO users(
        username,
        avatar_url,
        name
      )
        VALUES
        %L;`, userData.map((user) => {
          return[
            user.username,
            user.avatar_url,
            user.name
          ];
        })
      )
  return db.query(queryStr)
  })
  .then(() => {
    // console.log("INSERTING ARTICLES")
      const queryStr = format(`
      INSERT INTO articles(
        title,
        body,
        votes,
        topic,
        author,
        created_at
      )
        VALUES
        %L;`, articleData.map((article) => {
          return[
            article.title,
            article.body,
            article.votes,
            article.topic,
            article.author,
            article.created_at
          ];
        })
      )
  return db.query(queryStr)
  })
  .then(() => {
    // console.log("INSERTING COMMENTS")
      const queryStr = format(`
      INSERT INTO comments(
        author,
        article_id,
        votes,
        created_at,
        body
      )
        VALUES
        %L;`, commentData.map((comment) => {
          return[
            comment.author,
            comment.article_id,
            comment.votes,
            comment.created_at,
            comment.body
          ];
        })
      )
  return db.query(queryStr)
  })
}

module.exports = seed;