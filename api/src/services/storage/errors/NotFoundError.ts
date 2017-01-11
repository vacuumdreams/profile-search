import {HTTPError} from '../../../errors'

export class NotFoundError extends HTTPError {
  constructor() {
    super()
    this.code = 500
    this.msg = 'Data could not be found'
  }
}
