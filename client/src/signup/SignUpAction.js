export const signUp = signUpParams => {
  return {type: 'SIGN_UP', payload: signUpParams};
};
export const signUpSuccess = (name, email) => {
  return {type: 'SIGN_UP_SUCCESS', name: name};
};

export const signUpFail = error => {
  return {type: 'SIGN_UP_FAIL', error: error};
};
