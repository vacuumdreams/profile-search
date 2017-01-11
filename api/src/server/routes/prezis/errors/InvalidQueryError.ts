import {HTTPError} from '../../../../errors'

export class InvalidQueryError extends HTTPError {
  constructor() {
    super()
    this.code = 400
    this.msg = 'Request query is invalid'
  }
}
