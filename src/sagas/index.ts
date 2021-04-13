import { all, call } from 'redux-saga/effects';
import test from 'sagas/test';

export default function* rootSaga() {
    yield all([
        call(test),
    ]);
}