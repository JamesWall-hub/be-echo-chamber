const db = require('../db')


exports.selectAllTopics = () => {
    const queryString = `SELECT * FROM topics;`
    return db.query(queryString).then(({rows}) => {
            return rows
    })
} 