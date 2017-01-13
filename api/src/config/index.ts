import * as path from 'path'

import {Config} from './_interface'
export {Config} from './_interface'

const a = path.normalize(__dirname)
const dataPath: string = path.normalize(__dirname + '/../../data/prezis.json')

const host = 'http://localhost'
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
