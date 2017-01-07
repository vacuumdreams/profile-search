import {compose, curry, map, tap} from 'ramda'
import {createServer as restify} from 'restify'

import {adapter} from './adapters'
import {middlewares} from './middlewares'
import {routes} from './routes'

import {Server} from './_interface.d'

const useMiddlewares = curry((config, middlewares, server) => 
  compose(server.use, middlewares(config))
)

const addRoutes = curry((routes, server) => {
  console.log(routes)

  //map(map(useMethod(server)), keys(routes))
})

// const start = compose(
//   flip(call)(),
//   path(['start'])
// )

export const server: Server = config => 
  compose(
    // start,
    tap(addRoutes(routes)),
    tap(useMiddlewares(config, middlewares)),
    adapter(restify)
  )(config)
