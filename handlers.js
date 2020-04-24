'use strict'

const fetch = require('node-fetch')
const likes = require('./model')

exports.getPrices = async function (req, res, next) {
  const { stock, like } = req.query
  if (!stock) return next()
  const ip = req.ip
  try {
    if (Array.isArray(stock)) {
      const stock0 = await getStockData(stock[0], like, ip)
      const stock1 = await getStockData(stock[1], like, ip)
      const bothStocksAreValid = !stock0.error && !stock1.error
      if (bothStocksAreValid) makeLikesRelative(stock0, stock1)
      res.json({ stockData: [stock0, stock1] })
    } else {
      res.json({ stockData: await getStockData(stock, like, ip) })
    }
  } catch (error) {
    next(error)
  }
}

async function getStockData (stock, like, ip) {
  const { symbol, latestPrice } = await fetchStock(stock)
  if (!symbol) return { error: `${stock.toUpperCase()} not found` }
  if (like) await likes.add(symbol, ip)
  return {
    stock: symbol,
    price: latestPrice,
    likes: await likes.count(symbol)
  }
}

async function fetchStock (symbol) {
  const url = `https://repeated-alpaca.glitch.me/v1/stock/${symbol}/quote`
  const res = await fetch(url)
  return res.json()
}

function makeLikesRelative (stock0, stock1) {
  stock0.rel_likes = stock0.likes - stock1.likes
  stock1.rel_likes = stock1.likes - stock0.likes
  delete stock0.likes
  delete stock1.likes
}
