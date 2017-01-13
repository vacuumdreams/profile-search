import * as path from 'path'

import {Config} from './_interface'
export {Config} from './_interface'

const dataPath: string = path.resolve('./data/prezis.json')

const host = process.env.NODE_BPBP_API_URL || 'http://localhost'
const port = process.env.PORT || '8000'

export const config: Config = {
  server: {
    name: 'bpbp-api',
    url: `${host}:${port}`,
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
