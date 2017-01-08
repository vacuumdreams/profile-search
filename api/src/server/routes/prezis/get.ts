import {RouteMethod} from '../'
const fs = require('fs')
const path = require('path')

export const get: RouteMethod = ([storage]) => {
  //console.log(storage)

  return (req, res) => {
    console.log('/prezis GET handler')
    const data = fs.readFileSync(path.resolve('../api/data/prezis.json'), 'utf8')
    res.send(200, JSON.parse(data))
  }
}