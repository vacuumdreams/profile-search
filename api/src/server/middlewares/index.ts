import {bodyParser, CORS} from 'restify'
import {Middlewares} from './_interface.d'
export {Middlewares} from './_interface.d'

export const middlewares: Middlewares = config => ([
  ...bodyParser(),
  CORS({ origins: [  ] })
])