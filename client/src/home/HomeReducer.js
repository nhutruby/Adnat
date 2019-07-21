import _ from "lodash"
const HomeReducer = (state, action) => {
  if (state === undefined) return { organisations: [], user_organisation: null }

  switch (action.type) {
    case "HOME":
      return {
        ...state
      }
    case "HOME_FAIL":
      return {
        ...state,
        error: action.message
      }
    case "HOME_SUCCESS":
      return {
        ...state,
        organisations: _.uniqBy(
          state.organisations.concat(action.data.organisations),
          "id"
        )
      }
    case "DELETE_ORGANISATION":
      return { ...state, delete_organisation_id: action.payload.id }
    case "DELETE_ORGANISATION_FAIL":
      return { ...state }
    case "DELETE_ORGANISATION_SUCCESS":
      if (action.status === 204) {
        const organisations = state.organisations.filter(
          item => item.id !== state.delete_organisation_id
        )
        return {
          ...state,
          organisations: organisations,
          delete_organisation_id: null
        }
      } else {
        return { ...state }
      }
    case "NEW_ORGANISATION_SHOW":
      return { ...state, error: null }
    case "NEW_ORGANISATION":
      return { ...state, error: null }
    case "NEW_ORGANISATION_FAIL":
      return { ...state, error: action.error.response.data }
    case "NEW_ORGANISATION_SUCCESS":
      return {
        ...state,
        organisations: action.data.organisations,
        error: false
      }
    case "EDIT_ORGANISATION_SHOW":
      return { ...state, error: null }
    case "EDIT_ORGANISATION":
      return state
    case "EDIT_ORGANISATION_FAIL":
      return { ...state, error: action.error.response.data }
    case "EDIT_ORGANISATION_SUCCESS":
      state.organisations &&
        state.organisations.forEach(function(i) {
          if (i.id === action.data.id) {
            i.name = action.data.name
            i.hourly_rate = action.data.hourly_rate
          }
        })
      return { ...state, error: false }
    case "JOIN_ORGANISATION":
      return { ...state, error: null }
    case "JOIN_ORGANISATION_FAIL":
      console.log("1")
      return { ...state, error: action.error.response }
    case "JOIN_ORGANISATION_SUCCESS":
      console.log("2")
      console.log(action.data)
      return {
        ...state,
        user_organisation: action.data.organisation,
        shifts: action.data.shifts,
        error: false
      }
    default:
      return state
  }
}
export default HomeReducer
