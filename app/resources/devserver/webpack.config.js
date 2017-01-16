const {compose, prop, propOr} = require('ramda')

const path = require('path')
const autoprefixer = require('autoprefixer')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const ENV = {
  TEST: 'TEST',
  DEVELOPMENT: 'development',
  PRODUCTION: 'production',
}

const PATHS = {
  ROOT: '../..',
  DEVSERVER: '.',
  OUTPUT: 'dist',
}

const getPath = (notation = '') => path.join(__dirname, notation)

module.exports = config => ({
  devtool: (process.env.NODE_ENV === ENV.DEVELOPMENT) ? 'source-map': void 0,
  progress: true,
  colors: true,
  env: process.env.NODE_ENV || 'default',

  entry: [
    'whatwg-fetch',
    'bluebird',
    getPath(`${PATHS.ROOT}/src/index.js`),
  ],
  output: {
    path: getPath(`${PATHS.ROOT}/${PATHS.OUTPUT}/`),
    publicPath: config.app.url + `/${PATHS.OUTPUT}/`,
    filename: 'bundle.js',
  },

  resolve: {
    alias: {
      config: getPath('../../src/config'),
    },
  },

  module: {
    loaders: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        loader: 'babel',
      },
      {
        test: /\.(json)$/,
        exclude: /node_modules/,
        loader: 'json',
      },
      {
        test: /(index.scss)$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style', 
          loader: 'css?sourceMap!sass?sourceMap!postcss',
        }),
      },
      {
        test: /(_component.scss)$/,
        loader: 'style?sourceMap!css?modules&importLoaders=1&sourceMap&localIdentName=[path]___[name]__[local]___[hash:base64:5]!sass!postcss',
      },
      {
        test: /\.(mst)$/,
        exclude: /node_modules/,
        loader: 'mustache',
      },
      {
        test: /\.(jpg|png|gif)$/,
        exclude: /node_modules/,
        loader: 'file',
      },
    ],
  },

  plugins: [
    new ExtractTextPlugin('[name].css'),
  ],

  htmlPlugin: {
    title: config.app.name || 'Untitled',
    inject: true,
    //faviconPath: `/${PATHS.OUTPUT}/favicon.png`,
    filename: 'index.html',
    template: getPath(`${PATHS.DEVSERVER}/static/index.mst`),
  },

  devServer: {
    hot: process.env.NODE_ENV !== ENV.PRODUCTION,
    contentBase: getPath(`${PATHS.ROOT}/${PATHS.OUTPUT}`),
    filename: 'bundle.js',
    publicPath: `/`,
    stats: {
      progress: true,
      colors: true,
    },
    historyApiFallback: true,
  },

  postcss: () => [autoprefixer()],
})

module.exports.PATHS = PATHS
