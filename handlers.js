'use strict'

const fetch = require('node-fetch')
const model = require('./model')

module.exports = {
  getPrices: async (req, res, next) => {
    const symbol = req.query.stock
    const url = `https://repeated-alpaca.glitch.me/v1/stock/${symbol}/quote`
    const response = await fetch(url)
    try {
      const data = await response.json()
      res.json({
        stockData: {
          stock: data.symbol,
          price: data.latestPrice,
          likes: 0
        }
      })
    } catch (error) {
      next(error)
    }
  }
}
