'use strict'

const fetch = require('node-fetch')
const likes = require('./model')

module.exports.getPrices = async function (req, res, next) {
  const { stock: symbol, like } = req.query
  try {
    const data = await fetchStockData(symbol)
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

async function fetchStockData (symbol) {
  const url = `https://repeated-alpaca.glitch.me/v1/stock/${symbol}/quote`
  const res = await fetch(url)
  return res.json()
}
