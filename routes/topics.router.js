const { getAllTopics } = require('../controllers/topics.controllers.js')

const topicsRouter = require('express').Router()

topicsRouter
.route('/')
.get(getAllTopics)
.all((req,res) => {
    res.status(405).send({status: 405, msg: "Method not allowed"})
})

module.exports = topicsRouter