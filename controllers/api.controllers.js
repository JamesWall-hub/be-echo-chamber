const endPoints = require("../endpoints.json")

exports.getAllEndPoints = (req, res, next) => {
    readEndPoints()
    .then((endpoints) => {
        res.status(200).send({endpoints})
    })
    .catch(next)
}