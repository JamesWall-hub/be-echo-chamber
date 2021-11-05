const db = require('../db')

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
    CAST(COUNT(comments.comment_id) AS INTEGER) AS comment_count
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
        return rows[0]
    })
} 

exports.updateArticle = (id, votes) => {
    if(typeof votes !== "number"){
        return Promise.reject({status: 422, msg: "Unprocessable entity"})
    }
    const updateString = `
    UPDATE articles
    SET votes = votes + ($2)
    WHERE article_id = $1
    ;`
    const values = [id, votes]
    return db.query(updateString, values).then(() => {
        return this.selectArticleById(id)
    })
}

exports.selectAllArticles = async (
    sort_by = "created_at",
    order = "desc",
    topic
    ) => {

    if(!["created_at", "votes", "comment_count"].includes(sort_by)){
        return Promise.reject({status: 400, msg: "Invalid sort_by query"})
    }
    if(!["asc", "desc"].includes(order)){
        return Promise.reject({status: 400, msg: "Invalid order query"})
    }
    
    let queryString = `
    SELECT
    articles.title,
    articles.article_id,
    articles.body,
    articles.topic,
    articles.created_at,
    articles.votes,
    articles.author,
    CAST(COUNT(comments.comment_id) AS INTEGER) AS comment_count
    FROM articles 
    LEFT JOIN comments ON articles.article_id = comments.article_id
    ` 
    const queryValues = []

    if(topic){
        queryValues.push(topic)
        queryString += `WHERE topic = $1`
    }


    queryString += `
    GROUP BY articles.article_id
    ORDER BY ${sort_by} ${order}
    ;`

    const {rows} = await db.query(queryString, queryValues)

    if(rows.length === 0 && topic !== undefined){
        const topicResult = await db.query(`
        SELECT * FROM topics WHERE slug = $1
        ;`, queryValues)
        
        if(topicResult.rows.length === 0){
            return Promise.reject({status: 404, msg: "Topic not found"})
        }
    }
    

    return rows
}
