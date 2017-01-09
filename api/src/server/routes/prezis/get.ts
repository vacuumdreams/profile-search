import * as fs from 'fs'
import * as path from 'path'
import {curry} from 'ramda'
import {RouteMethod} from '../'

export const get: RouteMethod = ({storages}) => {

  //console.log(storage)

  return (req, res) => {
    console.log('/prezis GET handler')
    const data = fs.readFileSync(path.resolve('../api/data/prezis.json'), 'utf8')
    res.send(200, JSON.parse(data))
  }
}