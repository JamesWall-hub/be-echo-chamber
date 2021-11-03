const { getArticleById, voteArticle } = require("../controllers/articles.controllers")

const articlesRouter = require("express").Router()

articlesRouter.route("/:article_id").get(getArticleById).patch(voteArticle)

module.exports = articlesRouter