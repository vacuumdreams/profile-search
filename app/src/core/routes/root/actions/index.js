const {
  GET_PREZIS_REQUEST,
  GET_PREZIS_FAILURE,
  GET_PREZIS_SUCCESS,
} = require( '../../../constants')

// TODO: populate with data

const getPrezisRequest = () => ({
  type: GET_PREZIS_REQUEST,
})

const getPrezisFailure = () => ({
  type: GET_PREZIS_FAILURE,
})

const getPrezisSuccess = () => ({
  type: GET_PREZIS_SUCCESS,
})
