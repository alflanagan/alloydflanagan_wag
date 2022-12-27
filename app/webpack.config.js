const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  entry: './alloydflanagan/client/index.js',
  plugins: [new MiniCssExtractPlugin()],
  output: {
    filename: 'main.js',
    // should == django.conf.settings.STATIC_ROOT
    path: path.resolve(__dirname, 'static')
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
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
