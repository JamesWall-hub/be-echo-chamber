const {selectCommentsByArticle, insertCommentByArticle, deleteCommentById, updateComment, selectCommentById} = require("../models/comments.model")

exports.getCommentByArticleId = (req, res, next) => {
    const { article_id }= req.params
    const {limit, p } = req.query 
    selectCommentsByArticle(article_id, limit, p)
    .then((comments) => {
        res.status(200).send({ comments })
    })
    .catch(next)
}

exports.getCommentById = (req, res, next) => {
    const { comment_id } = req.params
    selectCommentById(comment_id)
    .then((comment) => {
        res.status(200).send({ comment })
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

exports.deleteComment = (req, res, next) => {
    const { comment_id } = req.params
    deleteCommentById(comment_id)
    .then(() => {
        res.status(204).send()
    })
    .catch(next)
}

exports.patchComment = (req, res, next) => {
    const { inc_votes, body } = req.body
    const { comment_id } = req.params
    updateComment(comment_id, inc_votes, body)
    .then((updatedComment) => {
        res.status(200).send({ comment: updatedComment})
    })
    .catch(next)
}