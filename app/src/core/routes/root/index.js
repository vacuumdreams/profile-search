const { createStore } = require( 'redux')
const { connect } = require( 'react-redux')

const defaultState = require( './state')
const reducer = require( './reducer')
//const {?} = require( './actions')
const RootContainer = require( './container')

const selector = state => ({
  // state selector for transforming values and passing them into the container
})

const dispatcher = dispatch => ({
  // UI triggered actions 
  /onEvent/(value) {
    dispatch(/action/(value))
  },
})

module.exports = {
  Container: RootContainer,
  connect: connect(selector, dispatcher),
  getStore: middlewares => createStore(reducer, defaultState, middlewares),
}
