import {applySpec, bind, compose, curry, flip, prop} from "ramda"
import {AdapterRestify, AdapterObjectRestify, Restify} from './_interface.d'
export {
  AdapterRestify,
  AdapterObjectRestify,
  MiddlewareRestify,
  Restify,
  RouteHandlerRestify,
} from './_interface.d'

const select = (name: string) => compose(flip(bind), prop(name))

const expose: (server: Restify) => AdapterObjectRestify = applySpec({
  get: select('get'),
  use: select('use'),
  start: select('listen'),
})

export const adapterRestify: AdapterRestify = server => 
  compose(
    expose,
    server,
    prop('server')
  )
