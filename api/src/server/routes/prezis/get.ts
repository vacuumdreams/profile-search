import {RouteHandler} from '../../adapters'

export const get: (services: any) => RouteHandler = ({storage}) => {
  console.log(storage)

  return (err, req, res) => {
    console.log('/prezis GET handler')
  }
}