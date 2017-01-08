import {compose, converge, curry, flip, map, keys, prop, tap} from 'ramda'
import {createServer as restify} from 'restify'

import {adapter} from './adapters'
import {addMiddlewares, middlewares} from './middlewares'
import {addRoutes, routes} from './routes'

import {Config} from '../config'
import {Server} from './_interface.d'

export const api: Server = config => 
  compose(
    tap(server => {server.start()}),
    tap(addRoutes(routes)),
    tap(addMiddlewares(config, middlewares)),
    adapter(restify)
  )(config)
