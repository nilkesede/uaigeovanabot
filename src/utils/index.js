const object = require('./object')
const string = require('./string')

module.exports = {
  ...object,
  ...string
}
