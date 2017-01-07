import {compose, curry, map, tap} from 'ramda'
import {createServer as restify} from 'restify'
import {adapterRestify as adapter} from './adapters/restify'
import {middlewares} from './middlewares'

import {Server} from './_interface.d'

const useMiddlewares = curry((config, server) => 
  compose(server.use, middlewares(config))
)

// const addRoutes = 

// const start = compose(
//   flip(call)(),
//   path(['start'])
// )

export const server: Server = config => 
  compose(
    // start,
    // tap(addRoutes())
    tap(useMiddlewares(config)),
    adapter(restify)
  )(config)
