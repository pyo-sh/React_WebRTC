import React, { useState, useEffect } from 'react';
import SignUpBox, { SignUpWrapper } from 'styles/auth/SignUpBox';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
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
    const { uid } = useSelector((state: RootState) => state.user);
    const history = useHistory();

    useEffect(() => {
        if (uid) {
            history.push('/');
        }
    }, [uid])

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
        <SignUpWrapper>
        <SignUpBox>
            <section className="SignUp-Profile-Section">
                <div className="SignUp-Profile-Title">????????? ??????</div>
                <section className="SignUp-Profile-Wrapper">
                    <img
                        className="SignUp-Image"
                        src={img&&URL.createObjectURL(img) ? URL.createObjectURL(img) : 'Profile.png'}
                        alt="Profile"
                        />
                    <input
                        className="SignUp-Input-Image"
                        type="file"
                        accept="image/jpeg, image/jpg, image/png"
                        onChange={onChangeUpload}
                        />
                </section>
            </section>
            <section className="SignUp-Section">
                <strong>??????</strong>
                <input
                    className="Delete-Input SignUp-Input"
                    placeholder="????????? ???????????????"
                    onChange={onChangeInput(setName)}
                    value={name}
                    />
                <p>{!nameCorrect && "????????? ??????????????????"}</p>
            </section>
            <section className="SignUp-Section">
                <strong>?????????</strong>
                <input
                    className="Delete-Input SignUp-Input"
                    placeholder="???????????? ???????????????"
                    onChange={onChangeInput(setEmail)}
                    value={email}
                    />
                <p>{!emailCorrect && "????????? ????????? ?????? ???????????????"}</p>
            </section>
            <section className="SignUp-Section">
                <strong>????????????</strong>
                <input
                    className="Delete-Input SignUp-Input"
                    placeholder="??????????????? ???????????????"
                    onChange={onChangeInput(setPassword)}
                    value={password}
                    />
                <p>{!pwCorrect && "??????????????? ?????? 1?????? ?????? ?????? ?????? ????????? ???????????? ?????????"}</p>
            </section>
            <section className="SignUp-Section">
                <strong>???????????? ??????</strong>
                <input
                    className="Delete-Input SignUp-Input"
                    placeholder="??????????????? ?????? ???????????????"
                    onChange={onChangeInput(setCheckPassword)}
                    value={checkPassword}
                    />
                <p>{!pwCheckCorrect && "??????????????? ?????? ???????????????"}</p>
            </section>
            <button
                className="Delete-Button SignUp-Button"
                onClick={onClickSignUp}
                >
                ???????????? ??????
            </button>
        </SignUpBox>
        </SignUpWrapper>
    );
}

export default SignUp;