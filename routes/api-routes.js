'use strict'

const router = require('express').Router()
const api = require('../handlers')

router.get('/stock-prices', api.getPrices)

module.exports = router
