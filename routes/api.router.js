const topicsRouter = require('./topics.router.js')
const articlesRouter = require('./articles.router.js')
const commentsRouter = require('./comments.router.js')
const { getAllEndPoints } = require('../controllers/api.controllers')

const apiRouter = require("express").Router()

apiRouter
.route('/')
.get(getAllEndPoints)
.all((req,res) => {
    res.status(405).send({status: 405, msg: "Method not allowed"})
})

apiRouter.use('/topics', topicsRouter)

apiRouter.use('/articles', articlesRouter)

apiRouter.use('/comments', commentsRouter)

module.exports = apiRouter