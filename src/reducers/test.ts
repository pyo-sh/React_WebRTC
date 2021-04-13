// State
export type StateType = {
    data: string,
    isLoadingData: boolean,
    loadDataErrorReason: string,
};

const initialState: StateType = {
    data: '',
    isLoadingData: false,
    loadDataErrorReason: '',
};

// Actions
// action.type 이 string 으로 추론되지 않고 실제 문자열 값으로 추론 되도록
export const LOAD_DATA_REQUEST = 'LOAD_DATA_REQUEST' as const;
export const LOAD_DATA_SUCCESS = 'LOAD_DATA_SUCCESS' as const;
export const LOAD_DATA_FAILURE = 'LOAD_DATA_FAILURE' as const;

// createActions
// TODO : make lib request -> success or failure
export const Load_Data_Request = (data: string) => ({
    type: LOAD_DATA_REQUEST,
    payload: data,
});

export const Load_Data_Success = (data: string) => ({
    type: LOAD_DATA_SUCCESS,
    payload: data,
});

export const Load_Data_Failure = (error: string) => ({
    type: LOAD_DATA_FAILURE,
    error: error,
});

// Actions -- Types
type testAction =
    |   ReturnType<typeof Load_Data_Request>
    |   ReturnType<typeof Load_Data_Success>
    |   ReturnType<typeof Load_Data_Failure>

// Reducer
function testReducer (
    state: StateType = initialState,
    action: testAction
): StateType {
    switch (action.type) {
        case LOAD_DATA_REQUEST:
            return {
                ...state,
                isLoadingData: true,
            }
        case LOAD_DATA_SUCCESS:
            return {
                ...state,
                data: action.payload,
                isLoadingData: false,
            }
        case LOAD_DATA_FAILURE:
            return {
                ...state,
                isLoadingData: false,
                loadDataErrorReason: action.error
            }
        default:
            return state;
    }
}

export default testReducer;

// 사용할 때 
/*
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'reducers';
import { Load_Data_Request } from reducers/test;

// 데이터 사용
const data = useSelector((state: RootState) => state.test.data);
// 액션 Dispatch
const dispatch = useDispatch();

    //...
    dispatch(Load_Data_Request());
*/