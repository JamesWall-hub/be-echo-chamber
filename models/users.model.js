const db = require('../db')


exports.selectAllUsers = async () => {
    const queryString = `SELECT username FROM users;`
    const { rows } = await db.query(queryString)
    return rows
} 

exports.selectUserById = async (id) => {
    const queryString = `
    SELECT *
    FROM users
    WHERE username = $1
    ;`
    const { rows } = await db.query(queryString, [id])
    if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Route not found" })
    }
    return rows[0]
}