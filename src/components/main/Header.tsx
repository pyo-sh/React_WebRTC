import React from 'react';
import HeaderBox from 'styles/main/HeaderBox';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'reducers';
import { LogOut_User_Request } from 'reducers/user';

const Header: React.FC = () => {
    const dispatch = useDispatch();
    const { uid, name, imageURL } = useSelector((state: RootState) => state.user);

    const onClickLogout = () => {
        dispatch(LogOut_User_Request());
    }

    return (
        <HeaderBox>
            <div className="Header-Logo">WebRTC</div>
            {uid
            ?
            <section className="Header-Profile">
                <img
                    className="Header-Profile-Image"
                    src={imageURL ? imageURL : 'Profile.png'}
                    />
                <p className="Header-Profile-Name">
                    {name}
                    <strong>
                        님!
                    </strong>
                </p>
                <button
                    className="Delete-Button Header-Button"
                    onClick={onClickLogout}
                    >
                    로그아웃
                </button>
            </section>
            :
            <section>
                <button className="Delete-Button">
                    로그인
                </button>
                <button className="Delete-Button">
                    회원가입
                </button>
            </section>
            }
        </HeaderBox>
    );
};

export default Header;