
const fs = require('fs-extra')
const pify = require('pify')

const log = require('./log')

module.exports = function mkdirs (name) {
  return pify(fs.mkdirs)(name).then(() => log(`Created '${name}'`))
}
