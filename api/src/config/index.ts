import * as path from 'path'

import {Config} from './_interface'
export {Config} from './_interface'

const dataPath: string = path.resolve('./data/prezis.json')

export const config: Config = {
  server: {
    name: 'bpbp-api',
    url: 'http://localhost:8000',
  },
  storage: {
    json: [{
      name: 'prezis',
      data: dataPath,
    }],
    // redis: {
    //   host: "127.0.0.1",
    //   port: 6379,
    // },
  },
}
