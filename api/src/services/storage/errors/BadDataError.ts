import {HTTPError} from '../../../errors'

export class BadDataError extends HTTPError {
  constructor() {
    super()
    this.code = 500
    this.msg = 'Data is corrupted, error in processing'
  }
}
