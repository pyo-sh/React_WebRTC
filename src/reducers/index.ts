import { combineReducers } from 'redux';
import test from 'reducers/test';
// rootReducer Type
export type RootState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
    test
});

export default rootReducer;