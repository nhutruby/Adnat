import {call, put, take, fork} from "redux-saga/effects";
import axios from "axios";

function signOut(authToken) {
  return axios.request({
    method: "delete",
    url: "/sessions/" + authToken
  });
}

function* workerSignOut() {
  while (true) {
    try {
      const request = yield take("SIGN_OUT");
      const authToken = request.payload;
      const response = yield call(signOut, authToken);
      const user = response.data;
      yield put({type: "SIGN_OUT_SUCCESS", user});
    } catch (error) {
      const message = error.response.data.error;
      yield put({type: "SIGN_OUT_FAIL", message});
    }
  }
}
export default function* watcherSignOut() {
  yield fork(workerSignOut);
}
