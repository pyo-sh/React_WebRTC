import { all, call } from 'redux-saga/effects';
import user from 'sagas/user';
import test from 'sagas/test';

export default function* rootSaga() {
    yield all([
        call(user),
        call(test),
    ]);
}