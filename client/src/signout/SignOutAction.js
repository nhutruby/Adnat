export const signOut = authToken => {
  return {type: "SIGN_OUT", payload: authToken};
};
export const signOutSuccess = (name) => {
  return {type: "SIGN_OUT_SUCCESS", name: name};
};
export const signOutFail = error => {
  return {type: "SIGN_OUT_FAIL", error: error};
};
