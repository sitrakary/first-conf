'use strict';

const Path = require('path');
const Os = require('os');
const Fs = require('fs');
const Util = require('util');
const Hoek = require('hoek');
const Joi = require('joi');

const internals = {};

internals.defaultDirectories = [
    '/etc',
    Path.join(Os.homedir(), '.config'),
    process.cwd()
];

internals.optionsSchema = Joi.object().keys({
    directories: Joi.array().default(internals.defaultDirectories)
});

module.exports = class {
    constructor(filemame, options) {

        if (options === undefined) {
            options = {};
        }

        const { error, value } = Joi.validate(options, internals.optionsSchema);

        Hoek.assert(error === null, 'invalid options are passed to first-conf.');
        this.directories = value.directories;
        this.configPath = filemame;
    }

    getDirectories() {

        return Hoek.clone(this.directories);
    }

    getConfigPath() {

        return this.configPath;
    }

    async exists() {

        const access = Util.promisify(Fs.access);
        let exist = false;

        for (const dir of this.directories) {
            console.log(dir);
            try {
                exist = await access(Path.join(dir, this.configPath), Fs.constants.F_OK);
                if (typeof exist === 'undefined') {
                    exist = true;
                    break;
                }
            }
            catch (_e) {}
        }
        return exist;
    }
};
