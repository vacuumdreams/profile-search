import {compose, curry} from 'ramda'
import {AddMiddlewares} from './'

export const addMiddlewares: AddMiddlewares = curry((config, middlewares, {use}) => 
  compose(use, middlewares)(config)
)