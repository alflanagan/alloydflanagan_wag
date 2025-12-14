const path = require('path')
// const webpack = require('webpack')

module.exports = {
  entry: './alloydflanagan/static/src/index.js',
  output: {
    path: path.resolve(__dirname, './alloydflanagan/static/dist'),
    filename: 'bundle.js'
  },
  mode: 'development',
  target: 'web',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "postcss-preset-env",
                    {
                      // Options
                    },
                  ],
                ],
              },
            },
          },
        ],
      },
    ]
  }
}
