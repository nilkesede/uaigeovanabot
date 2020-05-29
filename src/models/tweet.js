const {Schema, model} = require('mongoose')

const tweetSchema = new Schema({
  _id: Number,
  text: String,
  created_at: Date
}, {strict: false})

const Tweet = model('Tweet', tweetSchema)

module.exports = Tweet
