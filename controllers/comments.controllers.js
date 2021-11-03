const {selectCommentsByArticle, insertCommentByArticle} = require("../models/comments.model")

exports.getCommentByArticleId = (req, res, next) => {
    const { article_id }= req.params
    selectCommentsByArticle(article_id)
    .then((comments) => {
        res.status(200).send({ comments })
    })
    .catch(next)
}

exports.postCommentByArticle = (req, res, next) => {
    const {username, body} = req.body
    const { article_id }= req.params
    insertCommentByArticle(article_id, username, body)
    .then((comment) => {
        res.status(201).send({ comment })
    })
    .catch(next)
}