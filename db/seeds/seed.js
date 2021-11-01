const db = require('../index')

const seed = (data) => {

  const { articleData, commentData, topicData, userData } = data;

  console.log("in seed")

  // return db.query("DROP TABLE IF EXISTS comments;").then(()=>{
  //   console.log("then 1")
  //   return db.query("DROP TABLE IF EXISTS articles;")
  // })
  // .then(()=>{
  //   return db.query("DROP TABLE IF EXISTS users;")
  // })
  // .then(()=>{
  //   return db.query("DROP TABLE IF EXISTS topics;")
  // })
  // .then (()=>{
    console.log("CREATING TOPICS TABLE")
    return db.query(
      "CREATE TABLE topics (slug VARCHAR PRIMARY KEY, description VARCHAR);"
    )
  //})
  // 2. insert data
};

module.exports = seed;



//     .then(() => {
//       console.log("CREATING TREASURES TABLE")
//       return db.query(
//         `CREATE TABLE treasures (
//           treasure_id SERIAL PRIMARY KEY,
//           treasure_name VARCHAR, 
//           colour VARCHAR,
//           age int NOT NULL,
//           cost_at_auction VARCHAR,
//           shop INT REFERENCES shops(shop_id)
