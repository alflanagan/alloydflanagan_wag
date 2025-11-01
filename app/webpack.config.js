const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: './alloydflanagan/static/src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  mode: 'development',
  target: 'web',
}
