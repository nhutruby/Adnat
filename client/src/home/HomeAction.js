export const home = params => {
  return { type: "HOME", payload: params }
}
export const homeSuccess = () => {
  return { type: "HOME_SUCCESS" }
}
export const homeFail = error => {
  return { type: "HOME_FAIL", error: error }
}
export const deleteOrganisation = params => {
  return { type: "DELETE_ORGANISATION", payload: params }
}
export const deleteOrganisationSuccess = () => {
  return { type: "DELETE_ORGANISATION_SUCCESS" }
}
export const deleteOrganisationFail = error => {
  return { type: "DELETE_ORGANISATION_FAIL", error: error }
}
export const newOrganisationShow = error => {
  return { type: "NEW_ORGANISATION_SHOW" }
}
export const newOrganisation = params => {
  return { type: "NEW_ORGANISATION", payload: params }
}
export const newOrganisationSuccess = () => {
  return { type: "NEW_ORGANISATION_SUCCESS" }
}
export const newOrganisationFail = error => {
  return { type: "NEW_ORGANISATION_FAIL", error: error }
}
