import {HTTPError} from '../../../../errors'

export class InvalidSortParamError extends HTTPError {
  constructor() {
    super()
    this.code = 400
    this.msg = 'Cannot sort on the provided property'
  }
}
