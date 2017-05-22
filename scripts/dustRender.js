
const pify = require('pify')
const dust = require('dustjs-linkedin')
const fs = require('fs-extra')

const log = require('./log')

module.exports = function (srcPath, destPath, context) {
  return function (filePath) {
    var targetPath = filePath
    targetPath = targetPath.replace(srcPath, destPath)
    targetPath = targetPath.replace('.dust', '.html')
    return Promise.resolve()
      .then(() => pify(fs.readFile)(filePath))
      .then((data) => {
        var compiled = dust.compile(data.toString(), filePath)
        dust.loadSource(compiled)
        return pify(dust.render)(filePath, context)
      })
      .then((output) => pify(fs.writeFile)(targetPath, output))
      .then(() => log(`Rendered template '${filePath}' to '${targetPath}'`))
  }
}
