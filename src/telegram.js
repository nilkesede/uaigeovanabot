const https = require('https')
const qs = require('querystring')
const twitter = require('./twitter')
const {findSomeWord, findSomeFirstWord} = require('./utils')
const {BOT_TOKEN, BOT_USERNAME} = require('./config')

const sendMessage = (chat_id, reply_to_message_id) => text =>
  new Promise((resolve, reject) => {
    const requestData = qs.stringify({
      chat_id,
      text,
      reply_to_message_id
    })

    const requestOptions = {
      host: 'api.telegram.org',
      port: 443,
      path: '/bot' + BOT_TOKEN + '/sendMessage',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': requestData.length
      }
    }

    const request = https.request(requestOptions, resolve)

    request.on('error', reject)
    request.write(requestData)
    request.end()
  })

const answer = ({
  text,
  chat: {id: chatID, type: chatType},
  reply_to_message,
  message_id
}) => {
  if (findSomeFirstWord(['/start', '/start@' + BOT_USERNAME], text))
    return sendMessage(chatID)('fala filha da puta')

  if (reply_to_message && reply_to_message.from.username === BOT_USERNAME) {
    return twitter.getRandom()
      .then(sendMessage(chatID, message_id))
  }

  if (chatType === 'private' ||
    findSomeWord([
      '@' + BOT_USERNAME,
      'ge',
      'gê',
      'geovana',
      'fudida',
      'vagabunda'
    ], text)
  ) {
    return twitter.getRandom()
      .then(sendMessage(chatID))
  }

  return Promise.resolve()
}

module.exports = {
  answer
}
