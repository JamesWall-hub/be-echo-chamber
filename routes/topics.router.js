const { getAllTopics } = require('../controllers/topics.controllers.js')

const topicsRouter = require('express').Router()

topicsRouter.route('/').get(getAllTopics)

module.exports = topicsRouter