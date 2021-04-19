import { call, put, all, fork, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
    StateType,
    LOGIN_USER_REQUEST,
    LogIn_User_Request,
    LogIn_User_Success,
    LogIn_User_Failure,
    LOGOUT_USER_REQUEST,
    // LogOut_User_Request,
    SIGNUP_USER_REQUEST,
    SignUp_User_Request,
    SignUp_User_Success,
    SignUp_User_Failure,
} from 'reducers/user';
import { db, firebaseApp } from 'config/firebase';

// 로그인
async function LogInUserAPI({ email, password }: any){
    const { user } = await firebaseApp.auth().signInWithEmailAndPassword(email, password);
    if (user && user.uid){
        return {
            uid: user.uid,
            name: user.displayName,
            email: user.email,
            imageURL: user.photoURL,
        };
    }
    else{
        return {};
    }
}
function* LogInUser(action: ReturnType<typeof LogIn_User_Request>) {
    try {
        const result: StateType = yield call(LogInUserAPI, action.payload);
        console.log('Login payload result', result);
        yield put(LogIn_User_Success(result));
    } catch(error) {
        console.error(error);
        yield put(LogIn_User_Failure(error.message));
    }
};
function* watchLogInUser() {
    yield takeLatest(LOGIN_USER_REQUEST, LogInUser);
}

// 로그아웃
function* LogOutUser() {
    yield firebaseApp.auth().signOut();
};
function* watchLogOutUser() {
    yield takeLatest(LOGOUT_USER_REQUEST, LogOutUser);
}

// 회원가입 요청 및 저장
async function signUpUserAPI({ name, email, password, image }: any){
    const { user } = await firebaseApp.auth().createUserWithEmailAndPassword(email, password);
    console.log('signupAPI', user)
    if (user){
        let imageURL = '';
        const StorageRef = firebaseApp.storage().ref("User/" + user.uid + "/profile.jpg");
        if (image) {
            const snapshot = await StorageRef.put(image);
            imageURL = await snapshot.ref.getDownloadURL();
        }
        user.updateProfile({
            displayName: name,
            photoURL: imageURL
        });
        db.collection('User').doc(user.uid)
            .set({
                email,
                name,
                profileImage: imageURL
            })
            .then(() => {
                return {
                    uid: user.uid,
                    name,
                    email,
                    imageURL,
                };
            });
    }
    else return {};
}
function* signUpUser(action: ReturnType<typeof SignUp_User_Request>) {
    try {
        const result: StateType = yield call(signUpUserAPI, action.payload);
        console.log('signup payload result', result);
        yield put(SignUp_User_Success(result));
    } catch(error) {
        console.error(error);
        yield put(SignUp_User_Failure(error));
    }
};
function* watchSignUpUser() {
    yield takeLatest(SIGNUP_USER_REQUEST, signUpUser);
}

export default function* userSaga() {
    yield all([
        fork(watchLogInUser),
        fork(watchLogOutUser),
        fork(watchSignUpUser),
    ]);
};