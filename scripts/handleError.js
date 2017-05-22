
const log = require('./log')

module.exports = function handleError (err) {
  var message = ''
  if (err.filename) message += `${err.filename}: `
  message += (err.stack || err.message || err)
  log(message)
}
