const db = require('../db')
const fs = require('fs/promises')

exports.readEndPoints = () => {

    return fs.readFile('./endpoints.json', 'utf8' , (err, data) => {
        if (err) {
          return err
        } else {
          return data
        }
    })
    .then((data) => {
      return JSON.parse(data)
    })
} 