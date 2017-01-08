import {always, applySpec, bind, compose, converge, identity, last, path, prop, split} from "ramda"
import {Config} from '../../../config'
import {AdapterRestify, AdapterObjectRestify, Restify} from './_interface.d'
export {
  AdapterRestify,
  AdapterObjectRestify,
  MiddlewareRestify,
  Restify,
  RouteHandlerRestify,
  ApiOptionsRestify,
} from './_interface.d'

const extractPort: (url: string[]) => string = last

const getPort: (config: Config) => number = compose(
  parseInt,
  extractPort,
  split(':'),
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

