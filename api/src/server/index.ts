import {createServer as restify} from 'restify'
import {adapterRestify as adapter} from './adapters/restify'

import {Server} from './_interface.d'

// const createAdapter = 

// const useMiddlewares = 

// const addRoutes = 

export const server: Server = adapter(restify)
