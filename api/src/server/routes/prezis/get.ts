import {RouteMethod} from '../'

export const get: RouteMethod = ([storage]) => {
  console.log(storage)

  return (err, req, res) => {
    console.log('/prezis GET handler')
  }
}