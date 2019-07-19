const LogInReducer = (state, action) => {
  if (state === undefined) 
    return {
      user: {
        name: ""
      },
      user_logged_in: false
    };
  
  switch (action.type) {
    case "LOG_IN":
      return {
        ...state
      };
    case "LOG_IN_FAIL":
      return {
        user: {
          name: ""
        },
        user_logged_in: false,
        error: action.message
      };
    case "LOG_IN_SUCCESS":
      return {
        user_logged_in: true,
        user: {
          auth_token: action.user.auth_token,
          name: action.user.name
        }
      };
    default:
      return state;
  }
};
export default LogInReducer;
