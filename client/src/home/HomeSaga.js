import { call, put, take, fork } from "redux-saga/effects"
import axios from "axios"
function setHeader(authToken) {
  axios.defaults.headers.common["Authorization"] = authToken
}
function home(params) {
  setHeader(params.auth_token)
  return axios.get("/home", {
    params: { page: params.page, per_page: params.per_page }
  })
}

function* workerHome() {
  while (true) {
    try {
      const request = yield take("HOME")
      const params = request.payload
      const response = yield call(home, params)
      const data = response.data
      yield put({ type: "HOME_SUCCESS", data })
    } catch (error) {
      yield put({ type: "HOME_FAIL", error })
    }
  }
}
function deleteOrganisation(params) {
  setHeader(params.auth_token)
  return axios.delete("/organisations/" + params.id)
}

function* workerDeleteOrganisation() {
  while (true) {
    try {
      const request = yield take("DELETE_ORGANISATION")
      const params = request.payload
      const response = yield call(deleteOrganisation, params)
      const status = response.status
      yield put({ type: "DELETE_ORGANISATION_SUCCESS", status })
    } catch (error) {
      yield put({ type: "DELETE_ORGANISATION_FAIL", error })
    }
  }
}
function newOrganisation(params) {
  setHeader(params.auth_token)
  return axios.post("/organisations", {
    name: params.name,
    hourly_rate: params.hourly_rate,
    per_page: params.per_page
  })
}

function* workerNewOrganisation() {
  while (true) {
    try {
      const request = yield take("NEW_ORGANISATION")
      const params = request.payload
      const response = yield call(newOrganisation, params)
      const data = response.data
      yield put({ type: "NEW_ORGANISATION_SUCCESS", data })
    } catch (error) {
      yield put({ type: "NEW_ORGANISATION_FAIL", error })
    }
  }
}
function editOrganisation(params) {
  setHeader(params.auth_token)
  delete params.auth_token
  return axios.put("/organisations/" + params.id, params)
}

function* workerEditOrganisation() {
  while (true) {
    try {
      const request = yield take("EDIT_ORGANISATION")
      const params = request.payload
      const response = yield call(editOrganisation, params)
      const data = response.data
      yield put({ type: "EDIT_ORGANISATION_SUCCESS", data })
    } catch (error) {
      yield put({ type: "EDIT_ORGANISATION_FAIL", error })
    }
  }
}
function joinOrganisation(params) {
  setHeader(params.auth_token)
  delete params.auth_token
  return axios.put("/users/join", params)
}

function* workerJoinOrganisation() {
  while (true) {
    try {
      const request = yield take("JOIN_ORGANISATION")
      const params = request.payload
      const response = yield call(joinOrganisation, params)
      const data = response.data
      yield put({ type: "JOIN_ORGANISATION_SUCCESS", data })
    } catch (error) {
      yield put({ type: "JOIN_ORGANISATION_FAIL", error })
    }
  }
}
function leaveOrganisation(params) {
  setHeader(params.auth_token)
  return axios.put("/users/leave")
}

function* workerLeaveOrganisation() {
  while (true) {
    try {
      const request = yield take("LEAVE_ORGANISATION")
      const params = request.payload
      const response = yield call(leaveOrganisation, params)
      const data = response.data
      yield put({ type: "LEAVE_ORGANISATION_SUCCESS", data })
    } catch (error) {
      yield put({ type: "LEAVE_ORGANISATION_FAIL", error })
    }
  }
}
export default function* watcherSearch() {
  yield fork(workerHome)
  yield fork(workerDeleteOrganisation)
  yield fork(workerNewOrganisation)
  yield fork(workerEditOrganisation)
  yield fork(workerJoinOrganisation)
  yield fork(workerLeaveOrganisation)
}
