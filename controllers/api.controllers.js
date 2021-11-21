const endPoints = require("../endpoints.json")

exports.getAllEndPoints = (req, res, next) => {
    res.status(200).send(endPoints)
}