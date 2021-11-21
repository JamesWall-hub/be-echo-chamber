const { query } = require('../db')
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

exports.updateUser = async (username, name, avatar, newUsername) => {
    if(!username) return Promise.reject({status: 400, msg: "Invalid request"})
    let queryValues = [username, newUsername]

    let queryString = `
    UPDATE users
    SET
    username = ($2)
    `

    if(name) {
        queryValues.push(name)
        queryString += `, name = ($${queryValues.length})`
    }

    if(avatar) {
        queryValues.push(avatar)
        queryString += `, avatar_url = ($${queryValues.length})`
    }

    queryString += `
    WHERE username = ($1)
    RETURNING *
    ;`

    await db.query(queryString, queryValues)
    return this.selectUserById(newUsername)
}