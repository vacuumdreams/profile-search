import {ApiOptions} from '../server/adapters'

export interface Config {
  server: ApiOptions,
  storage: {
    json: {
      data: string
    },
    redis: {
      host: string,
      port: number
    }
  }
}
