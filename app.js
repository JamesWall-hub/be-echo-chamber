const express = require('express')
const apiRouter = require('./routes/api.router.js')

const app = express()

app.use(express.json())

app.use('/api', apiRouter)

app.all("/*", (req, res, next) => {
    res.status(404).send({msg: "Route not found"})
})


module.exports = app