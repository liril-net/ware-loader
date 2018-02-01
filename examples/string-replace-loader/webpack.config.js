const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const pkg = require('./package.json')

module.exports = {
  entry: './index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /.js$/,
        loader: path.resolve('../..'),
        exclude: path.resolve(__dirname, 'node_modules'),
        options: {
          raw: true,
          middleware: source => source.replace('__VERSION__', pkg.version)
        }
      }
    ]
  },
  plugins: [new HtmlWebpackPlugin()]
}
