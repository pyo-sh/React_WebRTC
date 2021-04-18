import { call, put, all, fork, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
    StateType,
    LOGIN_USER_REQUEST,
    Login_User_Request,
    Login_User_Success,
    Login_User_Failure,
    SIGNUP_USER_REQUEST,
    SignUp_User_Request,
    SignUp_User_Success,
    SignUp_User_Failure,
} from 'reducers/user';
import { db, firebaseApp } from 'config/firebase';

// API 에 옮겨도 되는 항목
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
    return {};
}

function* signUpUser(action: ReturnType<typeof SignUp_User_Request>) {
    try {
        const result: StateType = yield call(signUpUserAPI, action.payload);
        console.log('signup payload result', action.payload);
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
        fork(watchSignUpUser),
    ]);
};