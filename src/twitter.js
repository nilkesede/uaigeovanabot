const TwitterLib = require('twitter')

const config = require('./config')
const {Tweet} = require('./models')
const {renameProp} = require('./utils')

const getRandom = () =>
  Tweet.aggregate([
    {$match: {
      in_reply_to_status_id: null,
      in_reply_to_user_id: null,
      in_reply_to_screen_name: null,
      is_quote_status: false,
      retweeted_status: {
        $exists: false
      },
      'entities.urls': [],
      'entities.user_mentions': [],
      'entities.media': {
        $exists: false
      }
    }},
    {$sample: {size: 1}}
  ]).then(docs => {
    if (docs.length === 0)
      throw new Error('no tweet')

    if (docs[0])
      return docs[0].text
  })

const updateDatabase = max_id => {
  const options = {
    screen_name: config.TWITTER_USER,
    trim_user: true,
    exclude_replies: true,
    contributor_details: false,
    include_rts: false,
    count: 200
  }

  if (max_id !== null)
    options.max_id = max_id

  const client = new TwitterLib({
    consumer_key: config.TWITTER_CONSUMERKEY,
    consumer_secret: config.TWITTER_CONSUMERSECRET,
    access_token_key: config.TWITTER_OAUTHACCESSTOKEN,
    access_token_secret: config.TWITTER_OAUTHACCESSTOKENSECRET
  })

  return client.get('statuses/user_timeline', options).then(tweets => {
    const tweetsToInsert = tweets.map(t => renameProp('id', '_id', t))
    return Tweet.insertMany(tweetsToInsert, {ordered: false})
  }).then(tweets => {
    return updateDatabase(tweets[tweets.length - 1].id)
  }).catch(error => {
    if (Array.isArray(error))
      throw new Error(error.map(err => err.message))

    throw error
  })
}

module.exports = {
  getRandom,
  updateDatabase
}
