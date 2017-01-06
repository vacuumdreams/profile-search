import {Config} from '../../config/_interface.d'
import {Server} from '../_interface.d'

export interface Adapter {
  (config: Config): Server
}
