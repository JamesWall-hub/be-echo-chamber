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