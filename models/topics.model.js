const db = require('../db')


exports.selectAllTopics = async () => {
    const queryString = `SELECT * FROM topics;`
    const { rows } = await db.query(queryString)
    return rows
} 