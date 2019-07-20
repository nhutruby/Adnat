import {call, put, take, fork} from 'redux-saga/effects'
import axios from 'axios'

function home(authToken) {
  axios.defaults.headers.common['Authorization'] = authToken
  return axios.get('/home', {params: {page: 1, per_page: 20}})
}

function* workerHome() {
  while (true) {
    try {
      const request = yield take('HOME')
      const authToken = request.payload
      const response = yield call(home, authToken)
      const data = response.data
      yield put({type: 'HOME_SUCCESS', data})
    } catch (error) {
      console.log(error)
      yield put({type: 'HOME_FAIL', error})
    }
  }
}
export default function* watcherSearch() {
  yield fork(workerHome)
}
