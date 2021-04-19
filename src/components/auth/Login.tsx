import React, { useState, useEffect } from 'react';
import LoginBox, { LoginWrapper } from 'styles/auth/LoginBox';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'reducers';
import { LogIn_User_Request } from 'reducers/user';

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const dispatch = useDispatch();
    const { loadUserErrorReason } = useSelector((state: RootState) => state.user)

    const onChangeInput = (
        setState: React.Dispatch<React.SetStateAction<string>>
    ) => (event: any) => {
        const {value} = event.target;
        setState(value);
    };

    const onClickLogin = () => {
        const emailCheck = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i.test(email);
        const pwCheck = /^(?=.*[a-zA-Z0-9])((?=.*\d)|(?=.*\W)).{6,20}$/.test(password);

        if (!emailCheck || !pwCheck) {
            console.log("제대로 입력")
        }
        else {
            dispatch(LogIn_User_Request({
                email,
                password,
            }));
        }
    };

    return (
        <LoginWrapper>
        <LoginBox>
            <div className="Login-Logo">WebRTC</div>
            <section className="Login-Inputs">
                <input
                    className="Delete-Input Login-Input"
                    placeholder="이메일을 입력하세요"
                    onChange={onChangeInput(setEmail)}
                    value={email}
                    />
                <hr/>
                <input
                    className="Delete-Input Login-Input"
                    placeholder="비밀번호를 입력하세요"
                    onChange={onChangeInput(setPassword)}
                    value={password}
                    type="password"
                    />
            </section>
            <p className="Login-Error">{loadUserErrorReason}</p>
            <button
                className="Delete-Button Login-Button"
                onClick={onClickLogin}
                >
                로그인
            </button>
            <section className="Login-SubClick">
                <Link to="/signup">
                    회원가입
                </Link>
            </section>
        </LoginBox>
        </LoginWrapper>
    );
}

export default Login;