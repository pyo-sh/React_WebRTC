import React, { useState, useEffect } from 'react';
import LoginBox from 'styles/auth/LoginBox';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { RootState } from 'reducers';
import { LogIn_User_Request } from 'reducers/user';

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const dispatch = useDispatch();

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
        <LoginBox>
            <input
                className="LoginBox-Input"
                placeholder="이메일을 입력하세요"
                onChange={onChangeInput(setEmail)}
                value={email}
                />
            <input
                className="LoginBox-Input"
                placeholder="비밀번호를 입력하세요"
                onChange={onChangeInput(setPassword)}
                value={password}
                />
            <div>
                <button
                    onClick={onClickLogin}
                    >
                    Login
                </button>
                <Link to="/signup">
                    <button>Signup</button>
                </Link>
            </div>
        </LoginBox>
    );
}

export default Login;