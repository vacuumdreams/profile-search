const { pick } = require( 'ramda')
const React = require( 'react')
const { applyMiddleware } = require( 'redux')
const { render } = require( 'react-dom')
const { Provider } = require( 'react-redux')
const thunk = require( 'redux-thunk')

const routes = require( './routes')

const route = pick([location.pathname], routes)
const ConnectedApp = route.connect(route.Container)

module.exports = () => render(
  <Provider store={route.getStore(applyMiddleware(thunk))}>
    <ConnectedApp />
  </Provider>, 
  document.getElementById('app')
)
