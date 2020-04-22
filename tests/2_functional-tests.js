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

    test.skip('1 stock', function (done) {
      chai.request(server)
        .get('/api/stock-prices')
        .query({ stock: 'goog' })
        .end(function (err, res) {

          //complete this one too

          done()
        })
    })

    test.skip('1 stock with like', function (done) {

    })

    test.skip('1 stock with like again (ensure likes are not double counted)', function (done) {

    })

    test.skip('2 stocks', function (done) {

    })

    test.skip('2 stocks with like', function (done) {

    })

  })

})
