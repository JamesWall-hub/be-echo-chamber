const db = require('../db')

exports.selectArticleById = async (id) => {
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
    const { rows } = await db.query(queryString, values)
    if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Article not found" })
    }
    return rows[0]
} 

exports.updateArticle = async (id, votes=0) => {
        if(typeof votes !== "number"){
            return Promise.reject({status: 400, msg: "Bad request"})
    }
    
    const updateString = `
    UPDATE articles
    SET votes = votes + ($2)
    WHERE article_id = $1
    ;`
    const values = [id, votes]
    await db.query(updateString, values)
    return await this.selectArticleById(id)
}

exports.selectAllArticles = async (
    sort_by = "created_at",
    order = "desc",
    topic,
    limit = 10,
    p = 1
    ) => {

    if(!["created_at", "votes", "comment_count"].includes(sort_by)){
        return Promise.reject({status: 400, msg: "Invalid sort_by query"})
    }
    if(!["asc", "desc"].includes(order)){
        return Promise.reject({status: 400, msg: "Invalid order query"})
    }

    const offset = (p-1) * limit
    
    let queryString = `
    SELECT
    articles.title,
    articles.article_id,
    articles.topic,
    articles.created_at,
    articles.votes,
    articles.author,
    CAST(COUNT(comments.comment_id) AS INTEGER) AS comment_count
    FROM articles 
    LEFT JOIN comments ON articles.article_id = comments.article_id
    ` 
    const queryValues = [limit, offset]

    if(topic){
        queryValues.push(topic)
        queryString += `WHERE topic = $3`
    }


    queryString += `
    GROUP BY articles.article_id
    ORDER BY ${sort_by} ${order}
    LIMIT $1
    OFFSET $2
    ;`

    const {rows} = await db.query(queryString, queryValues)

    if(rows.length === 0 && topic !== undefined){
        const topicResult = await db.query(`
        SELECT * FROM topics WHERE slug = $1
        ;`, [topic])
        
        if(topicResult.rows.length === 0){
            return Promise.reject({status: 404, msg: "Topic not found"})
        }
    }
    

    return rows
}

exports.insertArticle = async (author, title, body, topic) => {

    const queryString = `
    INSERT INTO articles
    (
        title,
        body,
        topic,
        author,
        created_at
    )
    VALUES
        ($1, $2, $3, $4, $5)
    RETURNING article_id
    ;`
    const created = new Date()
    const values = [title, body, topic, author, created]

    const {rows} = await db.query(queryString, values)

    const {article_id} = rows[0]

    const updatedArticle = await this.selectArticleById(article_id)

    return updatedArticle

}

exports.deleteArticle = async (id) => {

    const queryString = `
    DELETE FROM articles
    WHERE article_id = $1
    RETURNING *
    ;`
    const values = [id]
    const { rows } = await db.query(queryString, values)
    if(rows.length === 0){
        return Promise.reject({status: 404, msg: "Article not found"})
    }
    return
}
