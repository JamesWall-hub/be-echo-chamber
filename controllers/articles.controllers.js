const {selectArticleById, updateArticle, selectAllArticles, insertArticle, deleteArticle} = require("../models/articles.model")

exports.getArticleById = (req, res, next) => {
    const { article_id } = req.params
    selectArticleById(article_id)
    .then((article) => {
        res.status(200).send({ article })
    })
    .catch(next)
}
exports.patchArticle = (req, res, next) => {
    const { inc_votes, body } = req.body
    const { article_id } = req.params
    updateArticle(article_id, inc_votes, body)
    .then((updatedArticle) => {
        res.status(200).send({ article: updatedArticle})
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

exports.postArticle = (req, res, next) => {
    const {author, title, body, topic} = req.body
    insertArticle(author, title, body, topic)
    .then((article) => {
        res.status(201).send({article})
    })
    .catch(next)
}

exports.deleteArticleById = (req, res, next) => {
    const { article_id } = req.params
    deleteArticle(article_id)
    .then(() => {
        res.status(204).send()
    })
    .catch(next)
}