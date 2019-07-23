import _ from "lodash"
const HomeReducer = (state, action) => {
  if (state === undefined)
    return {
      organisations: [],
      shifts: [],
      user_organisation: null
    }

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
      let organisations
      action.data.organisations
        ? (organisations = _.uniqBy(
            state.organisations.concat(action.data.organisations),
            "id"
          ))
        : (organisations = action.data.organisations)
      let shifts
      action.data.shifts
        ? (shifts = _.uniqBy(state.shifts.concat(action.data.shifts), "id"))
        : (shifts = action.data.shifts)

      return {
        ...state,
        organisations: organisations,
        user_organisation: action.data.organisation,
        shifts: shifts
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
      return { ...state, kind: action.payload, error: null }
    case "EDIT_ORGANISATION":
      return state
    case "EDIT_ORGANISATION_FAIL":
      return { ...state, error: action.error.response.data }
    case "EDIT_ORGANISATION_SUCCESS":
      switch (state.kind) {
        case "list":
          state.organisations &&
            state.organisations.forEach(function(i) {
              if (i.id === action.data.id) {
                i.name = action.data.name
                i.hourly_rate = action.data.hourly_rate
              }
            })
          break
        case "item":
          if (state.user_organisation && action.data) {
            state.user_organisation.name = action.data.name
            state.user_organisation.hourly_rate = action.data.hourly_rate
          }
          break
        default:
      }
      return { ...state, error: false }
    case "JOIN_ORGANISATION":
      return { ...state, error: null }
    case "JOIN_ORGANISATION_FAIL":
      return { ...state, error: action.error.response }
    case "JOIN_ORGANISATION_SUCCESS":
      return {
        ...state,
        user_organisation: action.data.organisation,
        shifts: action.data.shifts,
        error: false
      }
    case "LEAVE_ORGANISATION":
      return { ...state, error: null }
    case "LEAVE_ORGANISATION_FAIL":
      return { ...state, error: action.error.response }
    case "LEAVE_ORGANISATION_SUCCESS":
      return {
        ...state,
        organisations: action.data.organisations,
        user_organisation: null,
        shifts: null,
        error: false
      }
    case "NEW_SHIFT_SHOW":
      return { ...state, error: null }
    case "NEW_SHIFT":
      return { ...state, error: null }
    case "NEW_SHIFT_FAIL":
      return { ...state, error: action.error.response.data }
    case "NEW_SHIFT_SUCCESS":
      return {
        ...state,
        shifts: action.data.shifts,
        error: false
      }
    case "DELETE_SHIFT":
      return { ...state, delete_shift_id: action.payload.id }
    case "DELETE_SHIFT_FAIL":
      return { ...state }
    case "DELETE_SHIFT_SUCCESS":
      if (action.status === 204) {
        const shifts = state.shifts.filter(
          item => item.id !== state.delete_shift_id
        )
        return {
          ...state,
          shifts: shifts,
          delete_shift_id: null
        }
      } else {
        return { ...state }
      }
    case "EDIT_SHIFT_SHOW":
      return { ...state, error: null }
    case "EDIT_SHIFT":
      return state
    case "EDIT_SHIFT_FAIL":
      return { ...state, error: action.error.response.data }
    case "EDIT_SHIFT_SUCCESS":
      state.shifts &&
        state.shifts.forEach(function(i) {
          if (i.id === action.data.id) {
            i.start_time = action.data.start_time
            i.end_time = action.data.end_time
            i.break_length = action.data.break_length
          }
        })
      return { ...state, error: false }
    default:
      return state
  }
}
export default HomeReducer
