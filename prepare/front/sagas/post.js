import axios from "axios";
import { all, delay, fork, put, throttle } from "redux-saga/effects";

function addPostAPI(data) {
  return axios.post("/api/post", data);
}

function* addPost(action) {
  try {
    // const result = yield call(addPostAPI, action.data);
    yield delay(1000);
    yield put({
      type: "ADD_POST_SUCCESS",
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: "ADD_POST_FAILURE",
      data: err.response.data,
    });
  }
}

function* watchAddPost() {
  yield throttle("ADD_POST_REQUEST", addPost, 2000);
}

export default function* postSaga() {
  yield all([fork(watchAddPost)]);
}
