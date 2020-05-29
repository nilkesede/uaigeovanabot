const database = require('./database')
const telegram = require('./telegram')
const twitter = require('./twitter')

module.exports = {
  ...database,
  ...telegram,
  ...twitter
}
