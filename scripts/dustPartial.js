
const dust = require('dustjs-linkedin')
const fs = require('fs-extra')
const pify = require('pify')

const log = require('./log')

module.exports = function (basePath) {
  return function (filePath) {
    var name = filePath
    name = name.replace(`${basePath}/`, '')
    name = name.replace('.dust', '')
    return Promise.resolve()
      .then(() => pify(fs.readFile)(filePath))
      .then((data) => {
        var compiled = dust.compile(data.toString(), name)
        dust.loadSource(compiled)
      })
      .then(() => log(`Loaded template '${filePath}' as '${name}'`))
  }
}
