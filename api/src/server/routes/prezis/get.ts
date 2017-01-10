const path = require('ramda').path
import {Promise} from 'bluebird'
import {RouteMethod} from '../'

import {successHandler, errorHandler} from '../../../lib/util'

export const get: RouteMethod = services => {

  const getData: (path: string) => Promise = path(['storage', 'store', 'get'])(services)

  return (req, res) =>
    getData('prezis')
      .then(successHandler(res))
      .catch(errorHandler(res))
}
