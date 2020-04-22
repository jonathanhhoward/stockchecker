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

chai.use(chaiHttp)

suite('Functional Tests', function () {

  suite('GET /api/stock-prices => stockData object', function () {

    test('1 stock', function (done) {
      chai.request(server)
        .get('/api/stock-prices')
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
          assert.isNumber(stockData.likes)
          done()
        })
    })

    test('1 stock with like', function (done) {
      chai.request(server)
        .get('/api/stock-prices')
        .query({ stock: 'goog', like: 'true' })
        .end(function (err, res) {
          if (err) return done(err)
          const { stockData } = res.body
          assert.strictEqual(res.status, 200)
          assert.isAtLeast(stockData.likes, 1)
          done()
        })
    })

    test('1 stock with like again (ensure likes are not double counted)', function (done) {
      chai.request(server)
        .get('/api/stock-prices')
        .query({ stock: 'goog', like: 'true' })
        .end(function (err, res) {
          if (err) return done(err)
          const { stockData } = res.body
          assert.strictEqual(res.status, 200)
          assert.strictEqual(stockData.likes, 1)
          done()
        })
    })

    test.skip('2 stocks', function (done) {

    })

    test.skip('2 stocks with like', function (done) {

    })

  })

})
