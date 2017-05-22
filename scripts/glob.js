
const glob = require('glob')
const pify = require('pify')

module.exports = function (target, func) {
  return Promise.resolve()
    .then(() => pify(glob)(target))
    .then((files) => Promise.all(files.map(func)))
}
