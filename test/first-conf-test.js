'use strict';

const Lab = require('lab');
const FirstConf = require('..');

const { expect } = require('code');

const lab = exports.lab = Lab.script();

lab.describe('FirstConf', () => {

    lab.it('test works', () => {

        expect(1 + 1).to.be.equal(2);
    });
});
