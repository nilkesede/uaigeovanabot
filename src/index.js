const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const config = require('./config')
const telegram = require('./telegram')
const twitter = require('./twitter')

const port = process.env.PORT || 3000
const app = express()

mongoose.connect(config.DB_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).catch(error => console.error(error))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.get('/', (_, res) => {
  twitter.getRandom()
    .then(t => res.send(t))
    .catch(error =>
      res.status(500).send({
        message: error.message
      }))
})

app.get('/update', (_, res) => {
  twitter.updateDatabase()
    .then(() => res.sendStatus(200))
    .catch(error =>
      res.status(500).send({
        message: error.message
      }))
})

app.post('/', (req, res) => {
  if (req.body && req.body.message) {
    telegram.answer(req.body.message)
      .then(() => res.sendStatus(200))
      .catch(error => res.status(500).send({
        message: error.message
      }))

    return
  }

  res.status(500).send({
    message: 'no body message'
  })
})

app.listen(port, () => {
  console.log('listening on', port)
})
