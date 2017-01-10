import {compose, curry} from 'ramda'
import {AddMiddlewares} from './'

export const addMiddlewares: AddMiddlewares = curry((config, middlewares, adapter) => 
  compose(adapter.use, middlewares)(config)
)