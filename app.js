const express = require('express')
const cors = require('cors')
const apiRouter = require('./routes/api.router.js')
const {handleCustomErrors, handlePSQL, handlePSQLNotFound, handle500s, handlePSQLentity} = require("./errors.js")

const app = express()

app.use(cors())

app.use(express.json())

app.use('/api', apiRouter)

app.all("/*", (req, res, next) => {
    res.status(404).send({msg: "Route not found"})
})

app.use(handleCustomErrors)

app.use(handlePSQLentity)

app.use(handlePSQLNotFound) //review

app.use(handlePSQL)

app.use(handle500s)

module.exports = app
