const {
  GET_PREZIS_REQUEST,
  GET_PREZIS_FAILURE,
  GET_PREZIS_SUCCESS,
} = require( '../../../constants')
const defaultState = require( '../state')

// TODO: maintain state with action data

module.exports = (state = defaultState, action) => {
  switch (action.type) {
    case GET_PREZIS_REQUEST:
      return {...state}
    case GET_PREZIS_FAILURE:
      return {...state}
    case GET_PREZIS_SUCCESS:
      return {...state}
}