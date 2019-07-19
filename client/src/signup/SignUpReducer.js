const SignUpReducer = (state, action) => {
  if (state === undefined) 
    return {
      user: {
        name: ""
      },
      sign_up: false
    };
  
  switch (action.type) {
    case "SIGN_UP":
      return {
        ...state
      };
    case "SIGN_UP_FAIL":
      return {
        ...state,
        sign_up: false,
        error: action.message
      };
    case "SIGN_UP_SUCCESS":
      return {
        sign_up: true,
        user: {
          email: action.user.email,
          name: action.user.name
        }
      };
    default:
      return state;
  }
};
export default SignUpReducer;
