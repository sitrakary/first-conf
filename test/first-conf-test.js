/* global describe it */
const FirstConf = require('../lib/first-conf')
const path = require('path')
const { expect } = require('code')

describe('FirstConf', function () {
  describe('constants', function () {
    it('are immutable', function () {
      expect(FirstConf.STRATEGIES.MERGE).to.be.not.undefined()
      expect(() => {
        'use strict'
        FirstConf.STRATEGIES.MERGE = 3
      }).to.throw()
    })
  })

  describe('#create()', function () {
    it('throw an error when file name is undefined', function () {
      expect(() => FirstConf.create()).to.throw()
    })

    it('return a FirstConf object', function () {
      expect(FirstConf.create('file')).to.be.an.object().and.not.empty()
    })

    it('apply default directories options', function () {
      const firstConf = FirstConf.create('file')
      expect(firstConf.options.directories.length).to.be.above(0)
    })

    it('merge user options with default options', function () {
      const firstConf = FirstConf.create('file', {
        directories: ['a']
      })
      expect(firstConf.options.directories).to.only.include(['a'])
    })

    it('does not mutate options params', () => {
      const options = {
        directories: ['a'],
        isWillBeRemoved: {}
      }
      const firstConf = FirstConf.create('file', options)
      firstConf.options.isWillBeRemoved = { a: false }
      expect(options.isWillBeRemoved).to.be.empty()
    })

    it('merge all configuration by default', function () {
      const firstConf = FirstConf.create('file')
      expect(firstConf.options.strategy).to.be.equal(FirstConf.STRATEGIES.MERGE)
    })
  })

  describe('#loadConfigs()', function () {
    it('return new FirstConf object containing a configs property', function () {
      const options = {
        directories: [
          path.join(process.cwd(), 'test', 'fixtures', 'a'),
          path.join(process.cwd(), 'test', 'fixtures', 'm', 'n'),
          path.join(process.cwd(), 'test', 'fixtures', 'x', 'y', 'z')
        ]
      }
      let firstConf = FirstConf.create('config.json', options)
      firstConf = FirstConf.loadConfigs(firstConf)

      expect(firstConf.configs).to.be.an.array()
    })

    it('load all configuration files', function () {
      const options = {
        directories: [
          path.join(process.cwd(), 'test', 'fixtures', 'a'),
          path.join(process.cwd(), 'test', 'fixtures', 'm', 'n'),
          path.join(process.cwd(), 'test', 'fixtures', 'x', 'y', 'z')
        ]
      }
      let firstConf = FirstConf.create('config.json', options)
      firstConf = FirstConf.loadConfigs(firstConf)
      expect(firstConf.configs.length).to.be.above(0)
    })
  })

  describe('mergeConfigs()', function () {
    it('merge configuration from to to bottum', function () {
      const options = {
        directories: [
          path.join(process.cwd(), 'test', 'fixtures', 'a'),
          path.join(process.cwd(), 'test', 'fixtures', 'm', 'n'),
          path.join(process.cwd(), 'test', 'fixtures', 'x', 'y', 'z')
        ]
      }
      let firstConf = FirstConf.create('config.json', options)
      firstConf = FirstConf.loadConfigs(firstConf)
      const config = FirstConf.mergeConfigs(firstConf)
      expect(config.path).to.be.equal('x/y/z/config.json')
      expect(config.unique).to.be.true()
    })
  })

  describe('get(filename, options, defaultConfig)', function () {
    it('return default configuration when no configuration was found for the filename', function () {
      const options = {
        directories: [
          path.join(process.cwd(), 'test', 'fixtures', 'a'),
          path.join(process.cwd(), 'test', 'fixtures', 'm', 'n'),
          path.join(process.cwd(), 'test', 'fixtures', 'x', 'y', 'z')
        ]
      }
      const config = FirstConf.get('unknown.json', options, { x: 1 })
      expect(config.x).to.be.equal(1)
    })

    it('it return configuration from directories', function () {
      const options = {
        directories: [
          path.join(process.cwd(), 'test', 'fixtures', 'a'),
          path.join(process.cwd(), 'test', 'fixtures', 'm', 'n'),
          path.join(process.cwd(), 'test', 'fixtures', 'x', 'y', 'z')
        ]
      }
      const config = FirstConf.get('config.json', options)
      expect(config.path).to.be.equal('x/y/z/config.json', { x: 1 })
      expect(config.unique).to.be.true()
    })
  })
})
