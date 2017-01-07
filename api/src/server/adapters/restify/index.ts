import {applySpec, compose, curry, path, pick} from "ramda"
import {AdapterRestify, AdapterObjectRestify} from './_interface.d'
export {
  AdapterRestify,
  MiddlewareRestify,
  Restify,
  RouteRestify,
  RouteHandlerRestify,
  RouteInjectRestify
} from './_interface.d'

const createAdapter: (server: any) => AdapterObjectRestify = applySpec({
  get: path(['get']),
  use: path(['use']),
  start: compose(path(['listen'])),
})

export const adapterRestify: AdapterRestify = server => 
  compose(
    createAdapter,
    server,
    pick(['server'])
  )
