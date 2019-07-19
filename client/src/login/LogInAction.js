export const logIn = authParams => {
  return {type: "LOG_IN", payload: authParams};
};
export const logInSuccess = (authToken, name) => {
  return {type: "LOG_IN_SUCCESS", auth_token: authToken, name: name};
};
export const logInFail = error => {
  return {type: "LOG_IN_FAIL", error: error};
};
