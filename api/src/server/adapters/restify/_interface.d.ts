import {ServerOptions} from 'restify'
import {Adapter} from '../_interface'

interface RestifyCreate {
  (options: ServerOptions)
}

export interface AdapterRestify {
  (create: RestifyCreate): Adapter
}
