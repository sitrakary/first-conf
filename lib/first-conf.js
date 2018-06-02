// Copyright 2018 Sitraka Ratsimba
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"),
// to deal in the Software without restriction, including without limitation
// the rights to use, copy, modify, merge, publish, distribute, sublicense,
// and/or sell copies of the Software, and to permit persons to whom
// the Software is furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
// THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
// FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER

const hoek = require('hoek')
const path = require('path')
const os = require('os')
const _ = require('lodash')

const STRATEGIES = Object.freeze({
  MERGE: 'merge'
})

const DEFAULT_OPTIONS = {
  directories: [
    '/etc',
    path.join(os.homedir(), '.config'),
    process.cwd()
  ],
  strategy: STRATEGIES.MERGE
}

function create (filename, options) {
  const _options = _.cloneDeep(options)
  hoek.assert(filename, "Can't create a first-config object without file")
  return { filename, options: _.defaults(_options, DEFAULT_OPTIONS) }
}

function loadConfigs (firstConf) {
  const newFirstConf = _.cloneDeep(firstConf)
  const configs = _.map(firstConf.options.directories, (directory) => {
    const filePath = path.join(directory, firstConf.filename)
    let config = null
    try {
      config = require(filePath)
    } catch (_e) {}
    return config
  })
  newFirstConf.configs = configs
  return newFirstConf
}

function mergeConfigs (firstConf) {
  return _.reduce(firstConf.configs, (result, config) => {
    return _.merge(result, config)
  }, {})
}

function get (filename, options, defaultConfig) {
  let firstConf = create(filename, options)
  firstConf = loadConfigs(firstConf)
  if (_.every(firstConf.configs, _.isNull)) {
    return defaultConfig
  }
  return mergeConfigs(firstConf)
}

module.exports.create = create
module.exports.loadConfigs = loadConfigs
module.exports.mergeConfigs = mergeConfigs
module.exports.get = get
module.exports.STRATEGIES = STRATEGIES
