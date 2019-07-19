const AuthReducer = (state, action) => {
  if (state === undefined) 
    return {
      user: {
        name: ""
      },
      authorization: false
    };
  
  switch (action.type) {
    case "AUTH":
      return {
        ...state
      };
    case "AUTH_FAIL":
      return {
        ...state,
        authorization: false,
        error: action.message
      };
    case "AUTH_SUCCESS":
      return {
        authorization: true,
        user: {
          auth_token: action.user.auth_token,
          name: action.user.name
        }
      };
    default:
      return state;
  }
};
export default AuthReducer;
