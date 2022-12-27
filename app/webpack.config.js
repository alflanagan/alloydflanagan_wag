const path = require('path')

module.exports = {
  entry: './alloydflanagan/client/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'alloydflanagan/static')
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.less$/i,
        use: [
          // compiles Less to CSS
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      }
    ]
  }
}
