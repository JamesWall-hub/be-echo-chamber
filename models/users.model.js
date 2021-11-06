const db = require('../db')


exports.selectAllUsers = () => {
    const queryString = `SELECT username FROM users;`
    return db.query(queryString).then(({rows}) => {
            return rows
    })
} 

exports.selectUserById = (id) => {
    const queryString = `
    SELECT *
    FROM users
    WHERE username = $1
    ;`
    return db.query(queryString, [id]).then(({rows}) => {
            return rows[0]
    })
}