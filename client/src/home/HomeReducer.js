const HomeReducer = (state, action) => {
  if (state === undefined) return {}

  switch (action.type) {
    case 'HOME':
      return {
        ...state,
      }
    case 'HOME_FAIL':
      return {
        ...state,
        error: action.message,
      }
    case 'HOME_SUCCESS':
      console.log(action.data.organisations)
      return {
        ...state,
        organisations: action.data.organisations,
      }
    default:
      return state
  }
}
export default HomeReducer
