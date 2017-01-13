const {always, compose, isNil, keys, mapObjIndexed, partial, tap, when} = require( 'ramda')

module.exports = (storage) => ({
  get: storage.getItem.bind(storage),
  update: mapObjIndexed(storage.setItem.bind(storage)),
  getCreate: (key, defaultValue) => 
    compose(
        when(
          isNil,
          compose(
            tap(partial(storage.setItem.bind(storage), [key])),
            always(defaultValue),
          ) 
        ),
        storage.getItem.bind(storage),
    )(key),
})
