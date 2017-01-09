import {always, applySpec, compose, curry} from 'ramda'
import {RouteSpec} from './'

export const create: RouteSpec = (path, handlers) => applySpec({
  path: always(path),
  handlers,
})
