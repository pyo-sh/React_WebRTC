import React, { useEffect } from 'react';
import AppBox from 'styles/AppBox';
import 'styles/font.css';
import { Route } from 'react-router-dom';
import Main from 'components/main/Main';
import Room from 'components/chat/Room';
import Login from 'components/auth/Login';
import SignUp from 'components/auth/SignUp';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'reducers';
import { Set_User_Success } from 'reducers/user';
import { firebaseApp } from 'config/firebase';

const App: React.FC = () => {
    const dispatch = useDispatch();
    const { uid } = useSelector((state: RootState) => state.user);
    
    // 로그인 됐는지 확인하는 것... 딜레이가 좀 있다
    useEffect(() => {
        firebaseApp.auth().onAuthStateChanged((user) => {
            if (user && user.uid) {
                dispatch(Set_User_Success({
                    uid: user.uid,
                    name: user.displayName,
                    email: user.email,
                    imageURL: user.photoURL,
                }));
            }
        });
    }, [])

    return (
        <AppBox>
        {uid
        ?<>
            <Route path="/" component={Main} exact/>
            <Route path="/chat/:id" component={Room}/>
        </>
        : <Route path="/" component={Login} exact/>
        }
        <Route path="/signup" component={SignUp}/>
        </AppBox>
    );
}

export default App;
