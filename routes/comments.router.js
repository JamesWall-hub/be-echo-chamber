const { deleteComment }= require("../controllers/comments.controllers")

const commentsRouter = require("express").Router()

commentsRouter
.route("/:comment_id")
.delete(deleteComment)
.all((req,res) => {
    res.status(405).send({status: 405, msg: "Method not allowed"})
})

module.exports = commentsRouter