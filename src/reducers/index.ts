import { combineReducers } from 'redux';
import user from 'reducers/user';
// rootReducer Type
export type RootState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
    user,
});

export default rootReducer;