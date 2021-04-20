import React, { useEffect, useState } from 'react';
import RoomButtonBox, { UserAddModal } from 'styles/chat/RoomButtonBox';
import { useHistory } from 'react-router-dom';
import { db } from 'config/firebase';

type RoomButtonPropType = {
    id: string,

}

const RoomButton: React.FC<RoomButtonPropType> = ({ id }) => {
    const history = useHistory();
    const [userNameInput, setUserNameInput] = useState<string>('');
    const [displayModal, setDisplayModal] = useState<boolean>(false);

    const userRef = db.collection('User');
    const chatUserRef = db.collection('Chat').doc(id).collection('Users');
    const userRoomRef = db.collection('UserRooms')

    const onClickAddUser = () => {
        if (userNameInput) {
            const emailCheck = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i.test(userNameInput);
            if (emailCheck) {
                userRef.where("email", "==", userNameInput).get().then((snapShot) => {
                    if(snapShot.docs.length !== 0){
                        snapShot.docs.forEach((userSnap) => {
                            const user = userSnap.data();
                            console.log(user);
                            if (user.email) {
                                chatUserRef.doc(user.id).set({ state: false }).then(() => {
                                    userRoomRef.doc(user.id).collection('Rooms').doc(id).set({ state: true }).then(() => {
                                        alert('추가하였습니다!');
                                        setDisplayModal(false);
                                    });
                                });
                            }
                        })
                    }
                    else {
                        alert("이메일을 찾지 못하였습니다!");
                    }
                })
                .catch(() => alert("에러가 발생했습니다!\n다시 시도해주세요."));
            }
            else {
                alert('제대로 된 이메일을 입력하세요!');
            }
        }
    }

    const onClickModal = () => {
        setDisplayModal((prev) => !prev);
    }

    const onClickExit = () => {
        history.push('/');
    }

    return (
        <RoomButtonBox>
            {displayModal
            ?<UserAddModal>
                <p className="UserAddModal-Title">
                    초대할 유저의 이메일을 입력하세요.
                </p>
                <section className="UserAddModal-Section">
                    <input className="Delete-Input UserAddModal-Input"
                        onChange={(event) => setUserNameInput(event.target.value)}
                        />
                    <button className="Delete-Button UserAddModal-Button"
                        onClick={onClickAddUser}
                        >
                        초대
                    </button>
                </section>
            </UserAddModal>
            :<></>}
            <button className="Delete-Button RoomButton-Button RoomButton-Green"
                onClick={onClickModal}
                >
                초대하기
            </button>
            <button className="Delete-Button RoomButton-Button RoomButton-Red"
                onClick={onClickExit}
                >
                나가기
            </button>
        </RoomButtonBox>
    );
}

export default RoomButton;