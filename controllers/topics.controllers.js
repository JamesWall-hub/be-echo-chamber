const { selectAllTopics, insertTopic } = require('../models/topics.model.js')

exports.getAllTopics = (req, res, next) => {
    selectAllTopics()
    .then((topics) => {
        res.status(200).send({topics})
    })
    .catch(next)
}

exports.postTopic = (req, res, next) => {
    const {slug, description} = req.body
    insertTopic(slug, description)
    .then((topic) => {
        res.status(201).send({topic})
    })
    .catch(next)
}