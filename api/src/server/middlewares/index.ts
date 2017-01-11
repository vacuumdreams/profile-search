import {bodyParser, CORS, queryParser} from 'restify'
import {Middlewares} from './_interface.d'
export {AddMiddlewares, Middlewares} from './_interface.d'

export const middlewares: Middlewares = config => ([
  ...bodyParser(),
  queryParser(),
  CORS({ origins: [  ] })
])

export {addMiddlewares} from './add'
