import {StorageSetupRedis} from './_interface.d'
export {
  StorageRedis,
  StorageOptionsRedis,
  StorageSetupRedis,
} from './_interface.d'

export const redisAdapter: StorageSetupRedis = redis => config => ({
  get: () => {},
})
