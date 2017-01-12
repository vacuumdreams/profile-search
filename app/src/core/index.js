import { pick } from "ramda"
import React from "react"
import { applyMiddleware } from "redux"
import { render } from "react-dom"
import { Provider } from "react-redux"
import thunk from "redux-thunk"

import routes from "./routes"

const route = pick([location.pathname], routes)
const ConnectedApp = route.connect(route.Container)

export default () => render(
  <Provider store={route.getStore(applyMiddleware(thunk))}>
    <ConnectedApp />
  </Provider>, 
  document.getElementById("app")
)
