const mongoose = require('mongoose')

const config = require('../src/config')
const telegram = require('../src/telegram')
const twitter = require('../src/twitter')

module.exports = async (req, res) => {
  try {
    console.log(req.body)

    await mongoose.connect(config.DB_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    if (req.method === 'GET') {
      const tweet = await twitter.getRandom()
      return res.send(tweet)
    }

    if (req.method === 'POST') {
      if (req.body && req.body.message) {
        await telegram.answer(req.body.message)
        return res.status(200).end()
      }

      throw new Error('no body message')
    }

    throw new Error('method not allowed')
  } catch (error) {
    console.error(error)
    res.status(500).send({
      message: error.message
    })
  } finally {
    mongoose.connection.close()
  }
}
