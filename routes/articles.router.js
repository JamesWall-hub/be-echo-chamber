const { getArticleById, voteArticle, getAllArticles } = require("../controllers/articles.controllers")

const { getCommentByArticleId, postCommentByArticle } = require("../controllers/comments.controllers")

const articlesRouter = require("express").Router()

articlesRouter
.route("/:article_id")
.get(getArticleById)
.patch(voteArticle)
.all((req,res) => {
    res.status(405).send({status: 405, msg: "Method not allowed"})
})

articlesRouter
.route("/")
.get(getAllArticles)
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

