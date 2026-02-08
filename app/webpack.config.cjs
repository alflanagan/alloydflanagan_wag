const path = require('path')
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PnpWebpackPlugin = require('pnp-webpack-plugin');

module.exports = {
  entry: './alloydflanagan/src/index.js',
  output: {
    path: path.resolve(__dirname, './alloydflanagan/static/dist'),
    filename: 'bundle.js'
  },
  mode: 'development',
  target: 'web',
  resolve: {
    plugins: [PnpWebpackPlugin],
  },
  resolveLoader: {
    plugins: [PnpWebpackPlugin.moduleLoader(module)],
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          },
          MiniCssExtractPlugin.loader,
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin()
  ]
}
