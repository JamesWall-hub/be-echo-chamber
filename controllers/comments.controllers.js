const {selectCommentsByArticle} = require("../models/comments.model")

exports.getCommentByArticleId = (req, res, next) => {
    const { article_id }= req.params
    selectCommentsByArticle(article_id)
    .then((comments) => {
        res.status(200).send({ comments })
    })
    .catch(next)
}