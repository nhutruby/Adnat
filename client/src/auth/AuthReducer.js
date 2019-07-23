const AuthReducer = (state, action) => {
  if (state === undefined)
    return {
      user: {
        name: ""
      },
      authorization: false,
      isLoading: false
    }

  switch (action.type) {
    case "AUTH":
      console.log("start")
      return {
        ...state,
        isLoading: true
      }
    case "AUTH_FAIL":
      console.log("fail")
      return {
        ...state,
        authorization: false,
        error: action.message
      }
    case "AUTH_SUCCESS":
      console.log("success")
      return {
        authorization: true,
        user: {
          auth_token: action.user.auth_token,
          name: action.user.name
        },
        isLoading: false
      }
    default:
      return state
  }
}
export default AuthReducer
