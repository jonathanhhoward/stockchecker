'use strict'

const fetch = require('node-fetch')
const likes = require('./model')

module.exports = {
  getPrices: async (req, res, next) => {
    const { stock: symbol, like } = req.query
    const url = `https://repeated-alpaca.glitch.me/v1/stock/${symbol}/quote`
    try {
      const response = await fetch(url)
      const data = await response.json()
      if (like) await likes.add(symbol, req.ip)
      res.json({
        stockData: {
          stock: data.symbol,
          price: data.latestPrice,
          likes: await likes.count(symbol)
        }
      })
    } catch (error) {
      next(error)
    }
  }
}
