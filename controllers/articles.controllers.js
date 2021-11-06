const {selectArticleById, updateArticle, selectAllArticles} = require("../models/articles.model")

exports.getArticleById = (req, res, next) => {
    const { article_id } = req.params
    selectArticleById(article_id)
    .then((article) => {
        res.status(200).send({ article })
    })
    .catch(next)
}
exports.voteArticle = (req, res, next) => {
    const { inc_votes } = req.body
    const { article_id } = req.params
    updateArticle(article_id, inc_votes)
    .then((updatedArticle) => {
        res.status(202).send({ article: updatedArticle})
    })
    .catch(next)
}

exports.getAllArticles = (req, res, next) => {
    const {sort_by, order, topic, limit, p} = req.query
    selectAllArticles(sort_by, order, topic, limit, p)
    .then((articles) => {
        res.status(200).send({ articles })
    })
    .catch(next)
}