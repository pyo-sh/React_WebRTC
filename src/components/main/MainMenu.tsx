import React, { useState } from 'react';
import MainMenuBox from 'styles/main/MainMenuBox';
import { db } from 'config/firebase';
import { useSelector } from 'react-redux';
import { RootState } from 'reducers';

const MainMenu: React.FC = () => {
    const { uid } = useSelector((state: RootState) => state.user);
    const [name, setName] = useState<string>('');

    const chatRef = db.collection('Chat');
    const userRoomsRef = db.collection('UserRooms').doc(uid).collection('Rooms');

    const addRoom = () => {
        if(name){
            chatRef.add({
                name,
            })
            .then((ref) => {
                ref.collection('Users').doc(uid).set({ state: false });
                userRoomsRef.doc(ref.id).set({ state: true });
            })
            .catch(() => {
                alert('에러가 발생했습니다!');
            });

        }
        else {
            alert('방 이름을 입력하세요!');
        }
    }

    return (
        <MainMenuBox>
            <section>
                <p className="MainMenu-Name-Title">채팅 이름</p>
                <section className="MainMenu-Name-Section">
                    <input
                        className="Delete-Button MainMenu-Name-Input"
                        placeholder="채팅 이름"
                        onChange={(event) => {setName(event.target.value)}}
                        value={name}
                        />
                    <button className="Delete-Button MainMenu-Name-Button"
                        onClick={addRoom}
                        >
                        추가
                    </button>
                </section>
            </section>
        </MainMenuBox>
    );
};

export default MainMenu;