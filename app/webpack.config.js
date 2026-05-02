import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default {
  entry: './alloydflanagan/src/index.js',
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
              modules: true
            }
          }
        ]
      }
    ]
  }
}
