const topicsRouter = require('./topics.router.js')
const articlesRouter = require('./articles.router.js')

const apiRouter = require("express").Router()

apiRouter.use('/topics', topicsRouter)

apiRouter.use('/articles', articlesRouter)

module.exports = apiRouter