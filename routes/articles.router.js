const { getArticleById, voteArticle, getAllArticles, postArticle, deleteArticleById } = require("../controllers/articles.controllers")

const { getCommentByArticleId, postCommentByArticle } = require("../controllers/comments.controllers")

const articlesRouter = require("express").Router()

articlesRouter
.route("/:article_id")
.get(getArticleById)
.patch(voteArticle)
.delete(deleteArticleById)
.all((req,res) => {
    res.status(405).send({status: 405, msg: "Method not allowed"})
})

articlesRouter
.route("/")
.get(getAllArticles)
.post(postArticle)
.all((req,res) => {
    res.status(405).send({status: 405, msg: "Method not allowed"})
})

articlesRouter
.route("/:article_id/comments")
.get(getCommentByArticleId)
.post(postCommentByArticle)
.all((req,res) => {
    res.status(405).send({status: 405, msg: "Method not allowed"})
})

module.exports = articlesRouter

