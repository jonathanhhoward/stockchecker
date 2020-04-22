'use strict'

const fetch = require('node-fetch')
const model = require('./model')

module.exports = {
  getPrices: async (req, res, next) => {
    try {
      const result = await model.test()
      res.json(result)
    } catch (error) {
      next(error)
    }
  }
}
