import {applySpec, compose, prop, tap} from 'ramda'
import {StorageSetupRedis} from './_interface.d'
export {
  StorageRedis,
  StorageOptionsRedis,
  StorageSetupRedis,
} from './_interface.d'

export const redisAdapter: StorageSetupRedis = redis => config => {

  return {}
  // return compose(
  //   // applySpec({
  //   //   get: prop('getAsync'),
  //   // }),
  //   tap(console.log.bind(console)),
  //   redis
  // )(config)
}
