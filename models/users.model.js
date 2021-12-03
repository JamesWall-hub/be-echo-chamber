const { query } = require('../db')
const db = require('../db')


exports.selectAllUsers = async () => {
    const queryString = `SELECT * FROM users;`
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

exports.updateUser = async (username, name, avatar) => {
    if(!username) return Promise.reject({status: 400, msg: "Invalid request"})
    let queryValues = [username]

    let queryString = `
    UPDATE users
    SET
    `

    if(name) {
        queryValues.push(name)
        queryString += `name = ($${queryValues.length})`
    }

    if(avatar) {
        queryValues.push(avatar)
        if(name){
            queryString += `, avatar_url = ($${queryValues.length})`
        } else {
            queryString += `avatar_url = ($${queryValues.length})` 
        }
        
    }

    queryString += `
    WHERE username = ($1)
    RETURNING *
    ;`

    await db.query(queryString, queryValues)
    return this.selectUserById(username)
}

exports.insertUser = async (username, name="", avatar_url="") => {
    const queryString = `
    INSERT INTO users(
        username,
        avatar_url,
        name
    )
    VALUES
    ($1, $3, $2)
    RETURNING *
    ;`
    const values = [username, name, avatar_url]

    const { rows } = await db.query(queryString, values)

    return rows[0]
}