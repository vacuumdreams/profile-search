import {Config} from '../config/_interface.d'

export interface Server {
  (config: Config): void
}
