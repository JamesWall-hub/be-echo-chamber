exports.handleCustomErrors = (err, req, res, next) => {
    if(err.status && err.msg){
        res.status(err.status).send({msg: err.msg})
    } else {
        next(err)
    }
}

exports.handlePSQLNotFound = (err,req,res,next) => {
    if(err.code === "23503") {
        res.status(404).send({msg: "Route not found"})
    } else {
        next(err)
    }
}

exports.handlePSQL = (err, req, res, next) => {
    if (err.code === "22P02" || "23502"){
        res.status(400).send({msg: "Invalid input"})
    } else {
        next(err)
    }
}

exports.handle500s = (err, req, res, next) => {
    console.log(err)
    res.status(500).send({msg: "Internal server error"})
}