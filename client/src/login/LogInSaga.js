import {call, put, take, fork} from "redux-saga/effects";
import axios from "axios";

function logIn(authParams) {
  return axios.request({method: "post", url: "/sessions", data: authParams});
}

function* workerLogIn() {
  while (true) {
    try {
      const request = yield take("LOG_IN");
      const authParams = request.payload;
      const response = yield call(logIn, authParams);
      const user = response.data;
      yield put({type: "LOG_IN_SUCCESS", user});
    } catch (error) {
      const message = error.response.data.error;
      yield put({type: "LOG_IN_FAIL", message});
    }
  }
}
export default function* watcherSignIn() {
  yield fork(workerLogIn);
}
