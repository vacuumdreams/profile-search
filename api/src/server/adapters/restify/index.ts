import {applySpec, compose, curry, path, pick} from "ramda"
import {AdapterRestify} from './_interface.d'

const createAdapter = server => applySpec({
  get: path(['get']),
  use: path(['use']),
  start: compose(path(['listen'])),
})(server)

export const adapterRestify: AdapterRestify = server => 
  compose(
    createAdapter,
    server,
    pick(['server'])
  )
