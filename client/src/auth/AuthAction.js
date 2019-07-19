export const auth = authToken => {
  return {type: "AUTH", payload: authToken};
};
export const authSuccess = (name) => {
  return {type: "AUTH_SUCCESS", name: name};
};
export const authFail = error => {
  return {type: "AUTH_FAIL", error: error};
};
