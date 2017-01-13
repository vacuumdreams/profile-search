const {applySpec, compose, equals, ifElse, merge, prop, propOr, tap} = require('ramda')

const path = require('path')
const express = require('express')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const getWebpackConfig = require('./webpack.config')
const PATHS = require('./webpack.config.js').PATHS

const staticMiddleware = express.static(path.join(__dirname, '../../dist'))

const attachEntries = config => ([
  //...propOr([], 'entries', config),
  'webpack-dev-server/client?' + config.url,
  'webpack/hot/dev-server',
])

const getPlugins = config => ([
  //...propOr([], 'plugins', config),
  new webpack.HotModuleReplacementPlugin(),
  new HtmlWebpackPlugin(config.htmlPlugin),
])

const alter = applySpec({
  entry: attachEntries,
  plugins: getPlugins,
})

const createWpDevServer = compose(
  tap(server => server.use(`/${PATHS.OUTPUT}`, staticMiddleware)),
  config => new WebpackDevServer(
    compose(webpack, tap(console.log), alter)(config), 
    prop('devServer', config)
  )
)

module.exports = compose(
  createWpDevServer,
  getWebpackConfig
)
