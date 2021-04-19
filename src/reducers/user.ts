// State
export type StateType = {
    uid: string,
    nickname: string,
    email: string,
    imageURL: string,
    isLoadingUser: boolean,
    loadUserErrorReason: string,
};

const initialState: StateType = {
    uid: '',
    nickname: '',
    email: '',
    imageURL: '',
    isLoadingUser: false,
    loadUserErrorReason: '',
};

// Actions
// action.type 이 string 으로 추론되지 않고 실제 문자열 값으로 추론 되도록 하고
// with createActions
export const SET_USER_REQUEST = 'SET_USER_REQUEST' as const;
export const Set_User_Success = (data: any) => ({
    type: SET_USER_REQUEST,
    payload: data,
});

export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST' as const;
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS' as const;
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE' as const;
export const LogIn_User_Request = (data: any) => ({
    type: LOGIN_USER_REQUEST,
    payload: data,
});
export const LogIn_User_Success = (data: any) => ({
    type: LOGIN_USER_SUCCESS,
    payload: data,
});
export const LogIn_User_Failure = (error: string) => ({
    type: LOGIN_USER_FAILURE,
    error: error,
});

export const LOGOUT_USER_REQUEST = 'LOGOUT_USER_REQUEST' as const;
export const LogOut_User_Request = () => ({ type: LOGOUT_USER_REQUEST });

export const SIGNUP_USER_REQUEST = 'SIGNUP_USER_REQUEST' as const;
export const SIGNUP_USER_SUCCESS = 'SIGNUP_USER_SUCCESS' as const;
export const SIGNUP_USER_FAILURE = 'SIGNUP_USER_FAILURE' as const;
export const SignUp_User_Request = (data: any) => ({
    type: SIGNUP_USER_REQUEST,
    payload: data,
});
export const SignUp_User_Success = (data: any) => ({
    type: SIGNUP_USER_SUCCESS,
    payload: data,
});
export const SignUp_User_Failure = (error: string) => ({
    type: SIGNUP_USER_FAILURE,
    error: error,
});

// Actions -- Types
type userAction =
    |   ReturnType<typeof Set_User_Success>
    |   ReturnType<typeof LogIn_User_Request>
    |   ReturnType<typeof LogIn_User_Success>
    |   ReturnType<typeof LogIn_User_Failure>
    |   ReturnType<typeof LogOut_User_Request>
    |   ReturnType<typeof SignUp_User_Request>
    |   ReturnType<typeof SignUp_User_Success>
    |   ReturnType<typeof SignUp_User_Failure>

// Reducer
function userReducer (
    state: StateType = initialState,
    action: userAction
): StateType {
    switch (action.type) {
        case SET_USER_REQUEST:
            return {
                ...state,
                ...action.payload,
            }
        // 로그인
        case LOGIN_USER_REQUEST:
            return {
                ...state,
                isLoadingUser: true,
            }
        case LOGIN_USER_SUCCESS:
            return {
                ...state,
                ...action.payload,
                isLoadingUser: false,
            }
        case LOGIN_USER_FAILURE:
            return {
                ...state,
                isLoadingUser: false,
                loadUserErrorReason: action.error
            }
        // 로그아웃
        case LOGOUT_USER_REQUEST:
            return {
                uid: '',
                nickname: '',
                email: '',
                imageURL: '',
                isLoadingUser: false,
                loadUserErrorReason: '',
            }
        // 회원가입
        case SIGNUP_USER_REQUEST:
            return {
                ...state,
                isLoadingUser: true,
            }
        case SIGNUP_USER_SUCCESS:
            return {
                ...state,
                ...action.payload,
                isLoadingUser: false,
            }
        case SIGNUP_USER_FAILURE:
            return {
                ...state,
                isLoadingUser: false,
                loadUserErrorReason: action.error
            }
        default:
            return state;
    }
}

export default userReducer;

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