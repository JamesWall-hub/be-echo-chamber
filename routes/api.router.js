const topicsRouter = require('./api.topics.router.js')

const apiRouter = require("express").Router()

apiRouter.use('/topics', topicsRouter)

module.exports = apiRouters