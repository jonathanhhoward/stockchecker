'use strict'

const collection = require('./db')

module.exports.add = async (symbol, ip) => {
  const db = await collection(symbol)
  const result = await db.findOne({ ip: ip })
  if (!result) await db.insertOne({ ip: ip })
}

module.exports.count = async (symbol) => {
  const db = await collection(symbol)
  const cursor = db.find({})
  return await cursor.count()
}
