'use strict'

const { MongoClient } = require('mongodb')
const client = new MongoClient(process.env.MONGODB_URI, { useUnifiedTopology: true })
const connect = client.connect()

module.exports = async function (name) {
  try {
    const client = await connect
    return client.db().collection(name)
  } catch (error) {
    console.error(error)
  }
}
