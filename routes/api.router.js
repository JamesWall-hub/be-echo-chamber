const topicsRouter = require('./topics.router.js')
const articlesRouter = require('./articles.router.js')
const commentsRouter = require('./comments.router.js')
const usersRouter = require('./users.router.js')
const { getAllEndPoints } = require('../controllers/api.controllers')
const { handle405s } = require("../errors.js")

const apiRouter = require("express").Router()

apiRouter
.route('/')
.get(getAllEndPoints)
.all(handle405s)

apiRouter.use('/topics', topicsRouter)

apiRouter.use('/articles', articlesRouter)

apiRouter.use('/comments', commentsRouter)

apiRouter.use('/users', usersRouter)

module.exports = apiRouter