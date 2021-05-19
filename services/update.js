const mongoose = require('mongoose')

const config = require('../src/config')
const twitter = require('../src/twitter')

module.exports = async (req, res) => {
  try {
    if (req.method === 'GET') {
      await mongoose.connect(config.DB_CONNECTION, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })

      await twitter.updateDatabase()

      res.sendStatus(200)
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
