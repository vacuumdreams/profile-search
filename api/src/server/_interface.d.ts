import {Config} from '../config'

export interface Server {
  (config: Config): void
}
