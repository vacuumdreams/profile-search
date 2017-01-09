import {call, compose, flip, prop, tap} from 'ramda'
import {createServer as restify} from 'restify'

import {adapter} from './adapters'
import {addMiddlewares, middlewares} from './middlewares'
import {addRoutes, routes} from './routes'

import {Config} from '../config'
import {Server} from './_interface.d'

const start = (msg: string) => compose(
  flip(call)(msg),
  prop('start')
)

export const api: Server = config => 
  compose(
    tap(start('Server listening')),
    tap(addRoutes(config, routes)),
    tap(addMiddlewares(config, middlewares)),
    adapter(restify)
  )(config)
