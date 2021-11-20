const db = require('../db')
const fs = require('fs/promises')

exports.readEndPoints = async () => {

    const data_1 = await fs.readFile('./endpoints.json', 'utf8', (err, data) => {
    if (err) {
      return err
    } else {
      return data
    }
  })
  return JSON.parse(data_1)
} 