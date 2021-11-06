const { getAllUsers, getUserById } = require("../controllers/users.controllers")

const usersRouter = require("express").Router()

usersRouter
.route("/")
.get(getAllUsers)
.all((req,res) => {
    res.status(405).send({status: 405, msg: "Method not allowed"})
})

usersRouter
.route("/:user_id")
.get(getUserById)
.all((req,res) => {
    res.status(405).send({status: 405, msg: "Method not allowed"})
})

module.exports = usersRouter