const {call, compose, concat, flip, prop, tap} = require('ramda')
const restify = require('restify')

const {adapter} = require('./api/dist/server/adapters')
const {addMiddlewares, middlewares} = require('./api/dist/server/middlewares')
const {addRoutes, routes} = require('./api/dist/server/routes')

const config = require('./api/dist/config').config

const isDev = process.env.NODE_ENV === "development"

const start = msg => compose(
  flip(call)(msg),
  prop('start')
)

const clientRoutes = [
  {
    path: '/',
    handlers: {
      get: restify.serveStatic({ directory: './temp-client', file: 'index.html' }),
    },
  }, {
    path: 'dist/bundle.js',
    handlers: {
      get: restify.serveStatic({
        directory: `${__dirname}/temp-client/dist`,
        file: isDev ? 'bundle.js' : 'bundle.min.js'
      }),
    },
  }, {
    path: 'dist/styles.css',
    handlers: {
      get: restify.serveStatic({
        directory: `${__dirname}/temp-client/dist`,
        file: isDev ? 'styles.css' : 'styles.min.css'
      }),
    },
  },
]

const api = conf => 
  compose(
    tap(start('Server listening')),
    tap(addRoutes(config, compose(concat(clientRoutes), routes))),
    tap(addMiddlewares(config, middlewares)),
    adapter(restify.createServer)
  )(conf)

api(config)
