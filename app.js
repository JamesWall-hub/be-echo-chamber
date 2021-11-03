const express = require('express')
const apiRouter = require('./routes/api.router.js')

const app = express()

app.use(express.json())

app.use('/api', apiRouter)

app.all("/*", (req, res, next) => { // handle bad path
    res.status(404).send({msg: "Route not found"})
})

app.use((err, req, res, next) => { // handle custom
    if(err.status && err.msg){
        res.status(err.status).send({msg: err.msg})
    } else {
        next(err)
    }
})

app.use((err,req,res,next) => { // handle psql
    if(err.code === "23503") {
        res.status(404).send({msg: "Route not found"})
    } else {
        next(err)
    }
})


app.use((err, req, res, next) => { // handle psql
    if (err.code === "22P02" || "23502"){
        res.status(400).send({msg: "Invalid input"})
    } else {
        next(err)
    }
})

app.use((err, req, res, next) => { // handle serve
    console.log(err)
    res.status(500).send({msg: "Internal server error"})
})
module.exports = app