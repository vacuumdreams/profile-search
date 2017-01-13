import {always, applySpec, bind, compose, converge, identity, last, path, prop, propOr, split} from "ramda"
import {Config} from '../../../config'
import {AdapterRestify, AdapterObjectRestify, Restify} from './_interface.d'
export {
  AdapterRestify,
  AdapterObjectRestify,
  MiddlewareRestify,
  Restify,
  ResponseRestify,
  RequestRestify,
  RouteHandlerRestify,
  ApiOptionsRestify,
} from './_interface.d'

const url = require('url')

const getPort: (config: Config) => any = compose(
  parseInt,
  propOr('8000', 'port'),
  url.parse,
  path(['server', 'url'])
)

const select: (name: string) => Function = name => converge(
  bind, [
    prop(name),
    identity
  ]
)

const expose: (config: Config) => (server: Restify) => AdapterObjectRestify = config => applySpec({
  get: select('get'),
  use: select('use'),
  start: (server: Restify) => (msg: string) => 
    select('listen')(server)(getPort(config), always(console.log(msg))),
})

export const adapterRestify: AdapterRestify = server => config => compose(
  expose(config),
  server,
  prop('server')
)(config)

