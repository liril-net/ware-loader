[![npm][npm]][npm-url]
[![deps][deps]][deps-url]

<div align="center">
  <h1>Ware Loader</h1>
  <p>A loader for webpack that let you change your source in loader.</p>
</div>

<h2 align="center">Install</h2>

```bash
npm install --save-dev ware-loader
```

<h2 align="center">Examples</h2>

Use the loader either via your webpack config. Here is an example to parse markdown file as vue component.

### Via webpack config (recommended)

**webpack.config.js**
```js
const MarkdownIt = require('markdonw-it')
const md = new MarkdownIt()

module.exports = {
  module: {
    rules: [
      {
        test: /\.md$/,
        loader: 'ware-loader',
        enforce: 'pre',
        options: {
          raw: true,
          middleware: function(source) {
            return `<template><div>${md.render(source)}</div></template>`
          }
        }
      },
      {
        test: /\.md$/,
        use: 'vue-loader'
      }
    ]
  }
}
```

**In your application**
```js
import Doc from './doc.md';
```

<h2 align="center">Options</h2>

| Option | Description         | Type    | Default|
|---------- |-------------------- |---------|-------- |
| raw | If set to `false`, source will be wrapped with `'module.exports = ' + source` | boolean | `false` |
| async | Whehter middleware should be async function | boolean | `false` |
| middleware | Functions to change source | function[], function | - |


<h2 align="center">Maintainers</h2>

<table>
  <tbody>
    <tr>
      <td align="center">
        <img width="150" height="150"
        src="https://avatars3.githubusercontent.com/u/16029685?v=3&s=150">
        </br>
        <a href="https://github.com/liril-net">Cyril Su</a>
      </td>
    </tr>
  <tbody>
</table>

[npm]: https://img.shields.io/npm/v/ware-loader.svg
[npm-url]: https://npmjs.com/package/ware-loader

[deps]: https://david-dm.org/liril-net/ware-loader/status.svg
[deps-url]: https://david-dm.org/liril-net/ware-loader
