const { selectAllUsers, selectUserById } = require('../models/users.model.js')

exports.getAllUsers = (req, res, next) => {
    selectAllUsers()
    .then((users) => {
        res.status(200).send({users})
    })
    .catch(next)
}

exports.getUserById = (req, res, next) => {
    const { user_id }= req.params
    selectUserById(user_id)
    .then((user) => {
        res.status(200).send({user})
    })
    .catch(next)
}