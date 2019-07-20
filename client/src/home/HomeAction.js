export const home = authToken => {
  return {type: 'HOME', payload: authToken}
}
export const homeSuccess = () => {
  return {type: 'HOME_SUCCESS'}
}
export const homeFail = error => {
  return {type: 'HOME_FAIL', error: error}
}
