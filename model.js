'use strict'

const collection = require('./db')

module.exports = {
  test: async () => {
    const db = await collection('test')
    const result = await db.insertOne({ test: 'test' })
    return result.ops[0]
  }
}
