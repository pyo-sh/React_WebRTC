import React, { useState, useEffect } from 'react';
import SignUpBox from 'styles/signup/SignUpBox';
import { useDispatch } from 'react-redux';
import { RootState } from 'reducers';
import { SignUp_User_Request } from 'reducers/user';

const SignUp: React.FC = () => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [checkPassword, setCheckPassword] = useState<string>('');
    const [img, setImg] = useState<File>();

    const [nameCorrect, setNameCorrect] = useState<boolean>(true);
    const [emailCorrect, setEmailCorrect] = useState<boolean>(true);
    const [pwCorrect, setPwCorrect] = useState<boolean>(true);
    const [pwCheckCorrect, setPwCheckCorrect] = useState<boolean>(true);

    const dispatch = useDispatch();

    const onChangeInput = (
        setState: React.Dispatch<React.SetStateAction<string>>
    ) => (event: any) => {
        setState(event.target.value);
    };

    const onChangeUpload = (event: any) => {
        if (event.target.files) {
            setImg(event.target.files[0]);
        }
    }

    // 확인
    // /^[a-z0-9_+.-]+@([a-z0-9-]+\.)+[a-z0-9]{2,4}$/
    // /^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).{6,20}$/
    const onClickSignUp = () => {
        const nameCheck = name !== '';
        const emailCheck = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i.test(email);
        const pwCheck = /^(?=.*[a-zA-Z0-9])((?=.*\d)|(?=.*\W)).{6,20}$/.test(password);
        const isPwDiff = password === checkPassword && checkPassword !== '';

        if (!nameCheck || !emailCheck || !pwCheck || !isPwDiff) {
            setNameCorrect(nameCheck);
            setEmailCorrect(emailCheck);
            setPwCorrect(pwCheck);
            setPwCheckCorrect(isPwDiff);
        }
        else {
            dispatch(SignUp_User_Request({
                name,
                email,
                password,
                image: img
            }))
        }
    }

    return (
        <SignUpBox>
            <input
                className="SignUpBox-Input"
                placeholder="이름을 입력하세요"
                onChange={onChangeInput(setName)}
                value={name}
                />
            {!nameCorrect && "이름을 입력해주세요"}
            <input
                className="SignUpBox-Input"
                placeholder="이메일을 입력하세요"
                onChange={onChangeInput(setEmail)}
                value={email}
                />
            {!emailCorrect && "이메일 형식에 맞게 적어주세요"}
            <input
                className="SignUpBox-Input"
                placeholder="비밀번호를 입력하세요"
                onChange={onChangeInput(setPassword)}
                value={password}
                />
            {!pwCorrect && "비밀번호는 최소 1개의 숫자 혹은 특수 문자를 포함해야 합니다"}
            <input
                className="SignUpBox-Input"
                placeholder="비밀번호를 다시 입력하세요"
                onChange={onChangeInput(setCheckPassword)}
                value={checkPassword}
                />
            {!pwCheckCorrect && "비밀번호를 같게 입력하세요"}
            <img
                className="SignUpBox-Image"
                src={img&&URL.createObjectURL(img)}
                alt="Profile"
                />
            <input
                className="SignUpBox-Input-Image"
                type="file"
                accept="image/jpeg, image/jpg, image/png"
                onChange={onChangeUpload}
                />
            <button
                className="SignUpBox-Button"
                onClick={onClickSignUp}
                >
                회원가입
            </button>
        </SignUpBox>
    );
}

export default SignUp;