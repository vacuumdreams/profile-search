const optimize = require('webpack').optimize

const isDev = process.env.NODE_ENV === 'development'

module.exports = {
  watch: isDev,
  devtool: isDev ? 'source-map' : undefined,
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
      },
    ],
  },
  plugins: isDev ? [] : [
    new optimize.UglifyJsPlugin({minimize: true}),
  ],
}