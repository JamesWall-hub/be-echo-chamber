const express = require('express')
const apiRouter = require('./routes/api.router.js')

const app = express()

app.use(express.json())

app.use('/api', apiRouter)

app.all("/*", (req, res, next) => {
    res.status(404).send({msg: "Route not found"})
})

app.use((err, req, res, next) => {
    if (err.status && err.msg){
        res.status(err.status).send({msg: err.msg})
    } else {
        next(err)
    }
})

module.exports = app