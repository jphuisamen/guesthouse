
const pify = require('pify')
const fs = require('fs-extra')
const pkgcloud = require('pkgcloud')
const mimeTypes = require('mime-types')
const glob = require('glob')

const build = require('./build')
const handleError = require('./handleError')
const log = require('./log')

const aws = require('../aws.json')

const BUCKET = 'www.kroek.co.za'

function getFiles (client, container) {
  return new Promise((resolve, reject) => {
    client.getFiles(container, (err, files) => {
      if (err) return reject(err)
      resolve(files)
    })
  })
}

function removeFile (client, container) {
  return function (file) {
    return new Promise(function (resolve, reject) {
      client.removeFile(container, file.name, (err, result) => {
        if (err) return reject(err)
        log(`Removed '${file.name}' from '${container}'`)
        resolve(result)
      })
    })
  }
}

function uploadFile (client, container, basePath) {
  return function (srcPath) {
    var destPath = srcPath.replace(`${basePath}/`, '')
    return new Promise((resolve, reject) => {
      var readStream = fs.createReadStream(srcPath)
      var writeStream = client.upload({
        container,
        remote: destPath,
        acl: 'public-read',
        contentType: mimeTypes.lookup(srcPath)
      })
      writeStream.on('error', (err) => {
        log(`Error uploading '${srcPath}' to '${container}'`)
        reject(err)
      })
      writeStream.on('success', function () {
        log(`Uploaded '${srcPath}' to '${container}' as '${destPath}'`)
        resolve()
      })
      readStream.pipe(writeStream)
    })
  }
}

function cleanBucket (client, bucket) {
  return Promise.resolve()
  .then(() => getFiles(client, BUCKET))
  .then((files) => files.map(removeFile(client, BUCKET)))
  .then((files) => Promise.all(files))
}

function publish () {
  var client = pkgcloud.storage.createClient({
    provider: 'amazon',
    keyId: aws.key,
    key: aws.secret,
    region: aws.region
  })
  return Promise.resolve()
    .then(() => cleanBucket(client, BUCKET))
    .then(() => pify(glob)('www/**/*', {nodir: true, follow: true}))
    .then((files) => files.map(uploadFile(client, BUCKET, 'www')))
    .then((files) => Promise.all(files))
}

function main () {
  return Promise.resolve()
    .then(() => build())
    .then(() => publish())
}

module.exports = main

if (!module.parent) {
  main().catch(handleError)
}
