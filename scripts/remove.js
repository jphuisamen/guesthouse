
const fs = require('fs-extra')
const pify = require('pify')

const log = require('./log')

module.exports = function remove (name) {
  return pify(fs.remove)(name).then(() => log(`Removed '${name}'`))
}
