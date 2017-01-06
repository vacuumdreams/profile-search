import {applySpec, compose, curry, path, pick} from "ramda"
import {AdapterRestify} from './_interface.d'

const createAdapter = applySpec({
  use: path(['use']),
  start: compose(path(['listen'])),
})

export const adapterRestify: AdapterRestify = server => 
  compose(
    createAdapter,
    server,
    pick(['server'])
  )
