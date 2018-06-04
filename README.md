[![Semver](http://img.shields.io/SemVer/2.0.0.png)](http://semver.org/spec/v2.0.0.html)
[![Build Status](https://travis-ci.org/sitrakary/first-conf.png?branch=master)](https://david-dm.org/sitrakary/first-conf)

# First-Conf

**first-conf** returns a configuration object from a file in a directory list.

## Installation

```bash
npm -i first-conf
```

## Basic usage

This example assumes that you have `my-config.json` in on of directories in the list.

```js
const FirstConf = require('first-conf')

const config = FirstConf.get('my-config.json', {
  directories: [
    '/etc',
    process.cwd()
  ]
})

console.log(config)
```
> A more complete example are shown [here](#)
## API

- `get(filename, [options], [default])`
returns an object containing configuration where:
    - `filename`: the name of the file where configurations are stored.

    > Currently first-conf only supports JSON configuration files.

    - `options`: An object containing options that control the behavior of **first-conf**.
        - `directories`: an array containing a list of directory where **first-conf** will search the configuration file.

## Contributing

If you find a bug in the source code or a mistake in the documentation, you can help us by [submitting an issue](https://github.com/sitrakay/first-conf/issues) or a [pull request](https://github.com/sitrakay/first-conf/pulls) with a fix.

## Licence

This project is licensed under the MIT License - see the [LICENSE](https://github.com/sitrakay/first-conf/blob/master/LICENSE) file for details.
