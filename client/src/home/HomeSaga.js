import { call, put, take, fork } from "redux-saga/effects"
import axios from "axios"

function home(params) {
  axios.defaults.headers.common["Authorization"] = params.auth_token
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
  axios.defaults.headers.common["Authorization"] = params.auth_token
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
  axios.defaults.headers.common["Authorization"] = params.auth_token
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
export default function* watcherSearch() {
  yield fork(workerHome)
  yield fork(workerDeleteOrganisation)
  yield fork(workerNewOrganisation)
}
