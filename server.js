'use strict'

require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const helmet = require('helmet')

const apiRoutes = require('./routes/api-routes.js')
const fccTestingRoutes = require('./routes/fcctesting.js')
const runner = require('./test-runner')

const app = express()

app.use(helmet())
app.use(helmet.contentSecurityPolicy({
  directives: {
    scriptSrc: ['"self"', 'code.jquery.com'],
    styleSrc: ['"self"']
  }
}))

app.use('/public', express.static(`${__dirname}/public`))

app.use(cors({ origin: '*' })) //For FCC testing purposes only

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//Index page (static HTML)
app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/views/index.html`)
})

//For FCC testing purposes
fccTestingRoutes(app)

//Routing for API
app.use('/api', apiRoutes)

//404 Not Found Middleware
app.use((req, res, next) => {
  res.status(404).send('Not Found')
})

//Start our server and tests!
const port = process.env.PORT || 3000
app.listen(port, function () {
  console.log('Listening on port', port)
  if (process.env.NODE_ENV === 'test') {
    console.log('Running Tests...')
    setTimeout(function () {
      try {
        runner.run()
      } catch (error) {
        console.log('Tests are not valid:')
        console.log(error)
      }
    }, 3500)
  }
})

module.exports = app //for testing
