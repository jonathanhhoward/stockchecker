/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       (if additional are added, keep them at the very end!)
*/

const chaiHttp = require('chai-http')
const chai = require('chai')
const assert = chai.assert
const server = require('../server')

const collection = require('../db')

chai.use(chaiHttp)

suite('Functional Tests', function () {
  const route = '/api/stock-prices'

  after(async function () {
    const goog = await collection('GOOG')
    await goog.drop()
    const aapl = await collection('AAPL')
    await aapl.drop()
  })

  suite('GET /api/stock-prices => stockData object', function () {
    test('1 stock', function (done) {
      chai.request(server)
        .get(route)
        .query({ stock: 'goog' })
        .end(function (err, res) {
          if (err) return done(err)
          const { stockData } = res.body
          assert.strictEqual(res.status, 200)
          assert.isObject(stockData)
          assert.property(stockData, 'stock')
          assert.property(stockData, 'price')
          assert.property(stockData, 'likes')
          assert.strictEqual(stockData.stock, 'GOOG')
          assert.isNumber(stockData.price)
          assert.strictEqual(stockData.likes, 0)
          done()
        })
    })

    test('1 stock with like', function (done) {
      chai.request(server)
        .get(route)
        .query({ stock: 'goog', like: 'true' })
        .end(function (err, res) {
          if (err) return done(err)
          const { stockData } = res.body
          assert.strictEqual(res.status, 200)
          assert.strictEqual(stockData.likes, 1)
          done()
        })
    })

    test('1 stock with like again (ensure likes are not double counted)', function (done) {
      chai.request(server)
        .get(route)
        .query({ stock: 'goog', like: 'true' })
        .end(function (err, res) {
          if (err) return done(err)
          const { stockData } = res.body
          assert.strictEqual(res.status, 200)
          assert.strictEqual(stockData.likes, 1)
          done()
        })
    })

    test('2 stocks', function (done) {
      chai.request(server)
        .get(route)
        .query({ stock: ['goog', 'aapl'] })
        .end(function (err, res) {
          if (err) return done(err)
          const { stockData } = res.body
          assert.strictEqual(res.status, 200)
          assert.isArray(stockData)
          assert.strictEqual(stockData.length, 2)
          assert.isObject(stockData[0])
          assert.property(stockData[0], 'stock')
          assert.property(stockData[0], 'price')
          assert.property(stockData[0], 'rel_likes')
          assert.strictEqual(stockData[0].stock, 'GOOG')
          assert.isNumber(stockData[0].price)
          assert.strictEqual(stockData[0].rel_likes, 1)
          assert.property(stockData[1], 'stock')
          assert.property(stockData[1], 'price')
          assert.property(stockData[1], 'rel_likes')
          assert.strictEqual(stockData[1].stock, 'AAPL')
          assert.isNumber(stockData[1].price)
          assert.strictEqual(stockData[1].rel_likes, -1)
          done()
        })
    })

    test('2 stocks with like', function (done) {
      chai.request(server)
        .get(route)
        .query({ stock: ['goog', 'aapl'], like: 'true' })
        .end(function (err, res) {
          if (err) return done(err)
          const { stockData } = res.body
          assert.strictEqual(res.status, 200)
          assert.isArray(stockData)
          assert.strictEqual(stockData.length, 2)
          assert.isObject(stockData[0])
          assert.property(stockData[0], 'stock')
          assert.property(stockData[0], 'price')
          assert.property(stockData[0], 'rel_likes')
          assert.strictEqual(stockData[0].stock, 'GOOG')
          assert.isNumber(stockData[0].price)
          assert.strictEqual(stockData[0].rel_likes, 0)
          assert.property(stockData[1], 'stock')
          assert.property(stockData[1], 'price')
          assert.property(stockData[1], 'rel_likes')
          assert.strictEqual(stockData[1].stock, 'AAPL')
          assert.isNumber(stockData[1].price)
          assert.strictEqual(stockData[1].rel_likes, 0)
          done()
        })
    })
  })
})
