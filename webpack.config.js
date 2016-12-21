/*
|--------------------------------------------------------------------------
| Development config file
|--------------------------------------------------------------------------
|
| This is you webpack development config.
| Please leave it as it is.
|
*/

const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const autoprefixer = require('autoprefixer');

console.log("\n ----------------------------")
console.log(" Plugin development build ")
console.log(" ----------------------------\n")

module.exports = {
  entry: "./plugins/index.js",
  output: {
    filename: "index.js",
    path: "dist",
  },
  devServer: {
    historyApiFallback: true,
    inline: true,
    compress: false,
    port: 3000
  },
  externals: {
    writer: 'writer',
    substance: 'substance'
  },
  devtool: 'source-map',
  postcss: [
    autoprefixer({
      browsers: ['last 2 versions']
    })
  ],
  module: {
    loaders: [
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000'
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', 'css!sass')
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loaders: [
          'babel?presets[]=stage-0,presets[]=es2015-node6'
        ]
      }
    ],
    preLoaders: [
        { test: /\.jsx?$/, loader: 'eslint', exclude: /node_modules/ }
    ]
  },
  cssLoader: {
    // True enables local scoped css
    modules: false,
    // Which loaders should be applied to @imported resources (How many after the css loader)
    importLoaders: 1,
    sourceMap: true
  },
  eslint: {
    failOnWarning: false,
    failOnError: false
  },
  plugins: [
    new ExtractTextPlugin("style.css"),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development')
      }
    })
  ]
};
