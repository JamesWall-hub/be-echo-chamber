const { getArticleById, voteArticle, getAllArticles } = require("../controllers/articles.controllers")

const articlesRouter = require("express").Router()

articlesRouter.route("/:article_id").get(getArticleById).patch(voteArticle)

articlesRouter.route("/").get(getAllArticles)

module.exports = articlesRouter