const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');

const CURRENT_DIR = __dirname;
const DEPLOY_DIR = './dist';

module.exports = {
  entry: {
    'app': './src/js/application.js',
  },

  output: {
    filename: 'js/[name].[hash].js',
    publicPath: '/',
    path: path.resolve(CURRENT_DIR, DEPLOY_DIR)
  },

  module: {
    rules: [{
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" }
        ]
      },
      {
          test: /\.less$/,
          use: [{
              loader: "style-loader" // creates style nodes from JS strings
          }, {
              loader: "css-loader" // translates CSS into CommonJS
          }, {
              loader: "less-loader" // compiles Less to CSS
          }]
      }
    ]
  },

  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html'
    })
  ],

  devtool: 'inline-source-map',
  devServer: {
    port: 8080,
    compress: false, // gzip
    contentBase: 'src/', // todo set correct path
  }

};
