import {call, put, take, fork} from "redux-saga/effects";
import axios from "axios";

function auth(authToken) {
  axios.defaults.headers.common["Authorization"] = authToken;
  return axios.request({method: "post", url: "/users/me"});
}

function* workerAuth() {
  while (true) {
    try {
      const request = yield take("AUTH");
      const authToken = request.payload;
      const response = yield call(auth, authToken);
      const user = response.data;
      yield put({type: "AUTH_SUCCESS", user});
    } catch (error) {
      const message = error.response.data.error;
      yield put({type: "AUTH_FAIL", message});
    }
  }
}
export default function* watcherAuth() {
  yield fork(workerAuth);
}
