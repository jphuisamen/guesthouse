
const fs = require('fs-extra')
const pify = require('pify')

const log = require('./log')

function isExistError (err) {
  return err.code === 'EEXIST'
}

module.exports = function (src, dest) {
  return Promise.resolve()
    .then(() => pify(fs.ensureSymlink)(src, dest))
    .then(() => log(`Symlinked '${src}' to '${dest}'`))
    .catch(isExistError, function () {
      log(`Symlink '${src}' to '${dest}' already exists`)
    })
}
