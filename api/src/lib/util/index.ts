const curry = require('ramda').curry
import {Response, Request} from '../../server/adapters'
import {HTTPError} from '../../errors'

export const toArg: (index: number) => (...rest: any[]) => any = 
  index => (...rest) => rest[index]

export const toTimestamp: (value: string) => number = value => new Date(value).getTime()

export const alwaysThrow = ErrorConstructor => () => {
  throw new ErrorConstructor()
}

export const tryThrow: (fn: Function, err) => any = (fn, ErrorConstructor) => {
  let b
  try {
    b = fn()
  } catch (e) {
    throw new ErrorConstructor()
  }
  return b
}

export const successHandler: (res: Response) => (data: Object | Object[]) => void = 
  res => data => res.send(200, data)


export const errorHandler: (res: Response) => (err: any) => void = 
  res => err => res.send(err.code || 500, err.msg || 'Something went wrong, please try later')

