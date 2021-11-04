const { query } = require('../db')
const db = require('../db')

exports.selectCommentsByArticle = async (id) => {
    const queryString = `
    SELECT
    comment_id,
    votes,
    created_at,
    author,
    body
    FROM comments 
    WHERE article_id = $1;`
    
    const {rows} = await db.query(queryString, [id])

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
    INSERT INTO comments(
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
    
    // const articleResult = await db.query(`
    //     SELECT * FROM articles WHERE article_id = $1
    //     ;`, [id])
        
    // if(articleResult.rows.length === 0){
    //     return Promise.reject({status: 404, msg: "Article not found"})
    // }

    return rows[0]

}

exports.deleteCommentById = async (id) => {

    ("delete comment")

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