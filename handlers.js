'use strict'

const fetch = require('node-fetch')
const likes = require('./model')

module.exports.getPrices = async function (req, res, next) {
  const { stock, like } = req.query
  try {
    const { symbol, latestPrice } = await fetchStockData(stock)
    if (like) await likes.add(symbol, req.ip)
    res.json({
      stockData: {
        stock: symbol,
        price: latestPrice,
        likes: await likes.count(symbol)
      }
    })
  } catch (error) {
    next(error)
  }
}

async function fetchStockData (symbol) {
  const url = `https://repeated-alpaca.glitch.me/v1/stock/${symbol}/quote`
  const res = await fetch(url)
  return res.json()
}
