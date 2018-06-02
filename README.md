# first-conf

**first-conf** returns configuration from a list of directories.

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

console.log(config);
```

## API

- `get(configFilePath [, options [, default]])`
The constructor require two arguments:
    - `configPathPath`: the file configuration path relatives from directory to the configuration file.
    - `options`: An object containing options that control the behavior of **first-conf**.
        - `directories`: an array containing a list of directory where **first-conf** will search the configuration file.
- `get()`: returns an object containing configuration.

## Contributing

If you find a bug in the source code or a mistake in the documentation, you can help us by [submitting an issue](https://github.com/sitrakay/first-conf/issues) or a [pull request](https://github.com/sitrakay/first-conf/pulls) with a fix.

## Licence

This project is licensed under the MIT License - see the [LICENSE](https://github.com/sitrakay/first-conf/blob/master/LICENSE) file for details.
