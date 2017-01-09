import {StorageSetupJson} from './_interface.d'
export {
  StorageJson,
  StorageOptionsJson,
  StorageSetupJson,
} from './_interface.d'

export const jsonAdapter: StorageSetupJson = fs => config => ({
  get: () => {}
})
