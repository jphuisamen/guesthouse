
const _ = require('lodash')

const fs = require('fs-extra')
const glob = require('glob')
const pify = require('pify')

function loadFile (basePath) {
  return function (filePath) {
    var name = filePath.replace(`${basePath}/`, '').replace('.json', '')
    return Promise.resolve()
      .then(() => pify(fs.readJson)(filePath))
      .then((data) => [name, data])
  }
}

module.exports = function data () {
  return Promise.resolve()
    .then(() => pify(glob)('data/*.json'))
    .then((files) => Promise.all(files.map(loadFile('data'))))
    .then((result) => _.fromPairs(result))
}
