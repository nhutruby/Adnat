const SignOutReducer = (state, action) => {
  if (state === undefined) 
    return {
      user: {
        name: ""
      },
      sign_out: false
    };
  
  switch (action.type) {
    case "SIGN_OUT":
      return {
        ...state
      };
    case "SIGN_OUT_FAIL":
      return {
        ...state,
        sign_out: false,
        error: action.message
      };
    case "SIGN_OUT_SUCCESS":
      return {
        sign_out: true,
        user: {
          name: action.user.name
        }
      };
    default:
      return state;
  }
};
export default SignOutReducer;
