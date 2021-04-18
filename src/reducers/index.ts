import { combineReducers } from 'redux';
import test from 'reducers/test';
import user from 'reducers/user';
// rootReducer Type
export type RootState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
    user,
    test
});

export default rootReducer;