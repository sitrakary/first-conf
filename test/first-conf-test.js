'use strict';

const Lab = require('lab');
const FirstConf = require('..');
const Path = require('path');

const { expect } = require('code');

const lab = exports.lab = Lab.script();

const directories = [
    Path.join(process.cwd(), 'test', 'fixtures', 'etc'),
    Path.join(process.cwd(), 'test', 'fixtures', 'home', 'sitrakary', '.conf')
];

lab.describe('FirstConf', () => {

    lab.describe('constructor()', () => {

        lab.it('Handle undefined options', () => {

            const config = new FirstConf('file');

            expect(config.getDirectories()).to.be.an.array();
            expect(config.getDirectories().length).to.be.above(0);
        });

        lab.it('throws an error when passing invalid options', () => {

            const itThrow = () => {

                new FirstConf('file', { invalid: '' });
            };

            expect(itThrow).to.throw();
        });
    });

    lab.describe('getDirectories()', () => {

        lab.it('returns an array of configuration', () => {

            const config = new FirstConf('file', {});

            expect(config.getDirectories()).to.be.an.array();
            expect(config.getDirectories().length).to.be.above(0);
        });
    });

    lab.describe('getConfigPath()', () => {

        lab.it('return the relative path to config file', () => {

            const config = new FirstConf('first-conf/first.conf');
            expect(config.getConfigPath()).to.be.equal('first-conf/first.conf');
        });
    });

    lab.describe('exists()', () => {

        lab.it('return true if the confg exists in path', async () => {

            let config = new FirstConf('first-conf/first.conf', { directories });
            let exists = await config.exists();
            expect(exists).to.be.true();

            config = new FirstConf('first-conf/config.js', { directories });
            exists = await config.exists();
            expect(exists).to.be.true();
        });

        lab.it('return false if the config file does not exists', async () => {

            const config = new FirstConf('first-conf/nota.conf', { directories });
            const exists = await config.exists();
            expect(exists).to.be.false();
        });
    });
});
