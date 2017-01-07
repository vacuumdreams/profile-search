import {applySpec} from 'ramda'
import {prezis} from './prezis'
// import {storage} from '../../services'

export const routes = {
  prezis: prezis({storage: '__storage placeholder'})
}
