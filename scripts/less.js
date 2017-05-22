
const path = require('path')

const less = require('less')
const pify = require('pify')

const LessAutoPrefix = require('less-plugin-autoprefix')
const LessNpmImport = require('less-plugin-npm-import')

const fs = require('fs-extra')

const log = require('./log')

module.exports = function (srcPath, destPath) {
  var autoprefixPlugin = new LessAutoPrefix({browsers: ['> 5%']})
  var npmImportPlugin = new LessNpmImport({prefix: '~'})
  var sourceMap = {sourceMapFileInline: true}
  var plugins = [autoprefixPlugin, npmImportPlugin]
  var paths = [path.dirname(srcPath)]
  return Promise.resolve()
    .then(() => pify(fs.readFile)(srcPath))
    .then((data) => less.render(data.toString(), {paths, plugins, sourceMap}))
    .then((output) => pify(fs.writeFile)(destPath, output.css))
    .then(() => log(`Processed '${srcPath}' to '${destPath}'`))
}
