const { selectAllUsers, selectUserById, updateUser } = require('../models/users.model.js')

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

exports.patchUser = (req, res, next) => {
    const {username, new_username, name, avatar_url} = req.body
    updateUser(username, name, avatar_url, new_username)
    .then((user) => {
        res.status(200).send({user})
    })
    .catch(next)
}