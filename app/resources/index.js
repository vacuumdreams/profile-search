const url = require('url')
const createBundler = require('./devserver')
const config = require('../src/config')

const bundler = createBundler(config)
//bundler.listen(url.parse(config.app.url).port)
