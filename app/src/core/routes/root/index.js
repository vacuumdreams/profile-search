import { createStore } from "redux"
import { connect } from "react-redux"

import defaultState from "./state"
import reducer from "./reducer"
import {?} from "./actions"
import RootContainer from "./container"

const selector = state => ({
  // state selector for transforming values and passing them into the container
})

const dispatcher = dispatch => ({
  // UI triggered actions 
  /onEvent/(value) {
    dispatch(/action/(value))
  },
})

export default {
  Container: RootContainer,
  connect: connect(selector, dispatcher),
  getStore: middlewares => createStore(reducer, defaultState, middlewares),
}
