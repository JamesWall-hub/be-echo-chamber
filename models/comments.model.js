const { query } = require('../db')
const db = require('../db')

exports.selectCommentById = async (id) => {
    const queryString = `
    SELECT
    comment_id,
    votes,
    created_at,
    author,
    body
    FROM comments 
    WHERE comment_id = $1;`

    const {rows} = await db.query(queryString, [id])

    if(rows.length === 0){
        return Promise.reject({status: 404, msg: "Comment not found"})
    }

    return rows[0]
}

exports.selectCommentsByArticle = async (
    id,
    limit = 10,
    p = 1,
    sort_by = "created_at",
    order = "desc",
    ) => {
    
    if(!["created_at", "votes"].includes(sort_by)){
            return Promise.reject({status: 400, msg: "Invalid sort_by query"})
    }
    
    const offset = (p-1) * limit
    const queryString = `
    SELECT
    comment_id,
    votes,
    created_at,
    author,
    body
    FROM comments 
    WHERE article_id = $1
    ORDER BY ${sort_by} ${order}
    LIMIT $2
    OFFSET $3;`
    
    const {rows} = await db.query(queryString, [id, limit, offset])

    if(rows.length === 0){
        const articleResult = await db.query(`
        SELECT * FROM articles WHERE article_id = $1
        ;`, [id])
        
        if(articleResult.rows.length === 0){
            return Promise.reject({status: 404, msg: "Article not found"})
        }
    }
    return rows
} 

exports.insertCommentByArticle = async (id, username, body) => {
    const queryString = `
    INSERT INTO comments
    (
        article_id,
        author,
        body,
        created_at
    )
    VALUES
        ($1, $2, $3, $4)
    RETURNING *
    ;`
    const created = new Date()
    const values = [id, username, body, created]

    const {rows} = await db.query(queryString, values)

    return rows[0]

}

exports.deleteCommentById = async (id) => {

    const queryString = `
    DELETE FROM comments
    WHERE comment_id = $1
    RETURNING *
    ;`
    const values = [id]
    const { rows } = await db.query(queryString, values)
    if(rows.length === 0){
        return Promise.reject({status: 404, msg: "Comment not found"})
    }
    return

}

exports.updateComment = async (id, votes=0, reqBody) => {
    if(typeof votes !== "number"){
        return Promise.reject({status: 400, msg: "Bad request"})
    }

    const values = [id, votes]

    let updateString = `
    UPDATE comments
    SET votes = votes + ($2)
    `

    if(reqBody){
        values.push(reqBody)
        updateString += `, body = ($3)`
    }

    updateString += `WHERE comment_id = $1 RETURNING *;`

    const {rows} = await db.query(updateString, values)

    if(rows.length === 0){
        return Promise.reject({status: 404, msg: "Comment not found"})
    }

    return rows[0]
    
}