const adapter = require( './adapters')

const serviceStorage = adapter(localStorage)

module.exports = {
  serviceStorage,
}
