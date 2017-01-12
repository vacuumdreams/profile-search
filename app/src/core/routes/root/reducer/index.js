import {
  GET_PREZIS_REQUEST,
  GET_PREZIS_FAILURE,
  GET_PREZIS_SUCCESS,
} from "../../../constants"
import defaultState from "../state"

// TODO: maintain state with action data

export default (state = defaultState, action) => {
  switch (action.type) {
    case GET_PREZIS_REQUEST:
      return {...state}
    case GET_PREZIS_FAILURE:
      return {...state}
    case GET_PREZIS_SUCCESS:
      return {...state}
}