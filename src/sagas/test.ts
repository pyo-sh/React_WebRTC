import { call, put, all, fork, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
    StateType,
    LOAD_DATA_REQUEST,
    Load_Data_Request,
    Load_Data_Success,
    Load_Data_Failure,
} from 'reducers/test';

// API 에 옮겨도 되는 항목
function loadTestAPI(/*{ axios 에 필요하다면 }*/){
    return axios.get(`apis~~`);
}

function* loadTest(action: ReturnType<typeof Load_Data_Request>) {
    try {
        const result: StateType = yield call(loadTestAPI/*, action*/);
        console.log(action.payload);
        yield put(Load_Data_Success(result.data));
    } catch(error) {
        console.error(error);
        yield put(Load_Data_Failure(error));
    }
};
function* watchLoadTest() {
    yield takeLatest(LOAD_DATA_REQUEST, loadTest);
}

export default function* testSaga() {
    yield all([
        fork(watchLoadTest),
    ]);
};