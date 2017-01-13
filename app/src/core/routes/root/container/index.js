const React = require( 'react')

require( './_container.scss')

const RootContainer (props) => (
  // assemble the components for this route here, and pass them down the props they need
  <div {...props} />
)


module.exports = RootContainer