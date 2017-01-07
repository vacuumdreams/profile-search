import {Middleware} from '../adapters'
import {Config} from '../../config/_interface.d'

export interface Middlewares {
  (config: Config): Middleware[]
}
