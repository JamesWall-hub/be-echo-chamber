const db = require('../db')


exports.selectAllTopics = async () => {
    const queryString = `SELECT * FROM topics;`
    const { rows } = await db.query(queryString)
    return rows
} 

exports.insertTopic = async (slug, description) => {
    const queryString = `
    INSERT INTO topics(
        slug,
        description
    )
    VALUES(
        $1,
        $2
    )
    RETURNING *
    ;`

    const values = [slug, description]
    const { rows } = await db.query(queryString, values)
    return rows[0]
}