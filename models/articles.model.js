const db = require('../db')
const {formatCount} = require('../utils.js')

exports.selectArticleById = (id) => {
    const queryString = `
    SELECT
    articles.title,
    articles.article_id,
    articles.body,
    articles.topic,
    articles.created_at,
    articles.votes,
    articles.author,
    COUNT(comments.comment_id) AS comment_count
    FROM articles 
    LEFT JOIN comments ON articles.article_id = comments.article_id
    WHERE articles.article_id = $1
    GROUP BY articles.article_id
    ;`
    const values = [id]
    return db.query(queryString, values).then(({rows}) => {
        if (rows.length === 0){
            return Promise.reject({status: 404, msg: "Route not found"})
        }
        const formattedData = formatCount(rows)
        return formattedData[0]
    })
} 