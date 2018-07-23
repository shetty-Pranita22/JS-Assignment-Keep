const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: "./src/js/index.js",
  output: {
    path: __dirname+"./public",
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      },
      {
        test: /\.css$/,
        use:[ {
           loader: 'style-loader',
          },
          {
            loader: 'css-loader'
         }]
      },
      {
        test: /\.scss$/,
        exclude: /(node_modules)/,
        use:{
           loader: 'sass-loader',
        }
      }
    ]
  },
  devtool: "cheap-eval-source-map",
  plugins: [
  new HtmlWebpackPlugin({template: 'index.html'})
  ]
}
