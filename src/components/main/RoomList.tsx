import React, { useState, useEffect } from 'react';
import RoomListBox from 'styles/main/RoomListBox';
import RoomItem from 'components/main/RoomItem';
import { db } from 'config/firebase';
import { useSelector } from 'react-redux';
import { RootState } from 'reducers';

const RoomList: React.FC = () => {
    const { uid } = useSelector((state: RootState) => state.user);
    const [rooms, setRooms] = useState<Array<any>>([]);
    const roomRef = db.collection('UserRooms').doc(uid).collection('Rooms');

    useEffect(() => {
        // 접속할 수 있는 방을 나타내고 uid 를 통해 접속
        roomRef.get().then((docs) => {
            const datas = docs.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }))
            setRooms(datas);
        });
    }, [])

    return (
        <RoomListBox>
            {rooms.map(({id, name, people}, index) => (
                <RoomItem
                    key={index}
                    id={id}
                    name={name}
                    people={people}
                    />
            ))}
        </RoomListBox>
    );
};

export default RoomList;