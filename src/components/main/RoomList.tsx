import React, { useState, useEffect } from 'react';
import RoomListBox from 'styles/main/RoomListBox';
import RoomItem from 'components/main/RoomItem';
import { db } from 'config/firebase';
import { useSelector } from 'react-redux';
import { RootState } from 'reducers';

const RoomList: React.FC = () => {
    const { uid } = useSelector((state: RootState) => state.user);
    const [rooms, setRooms] = useState<any>([]);
    const [roomNames, setRoomNames] = useState<any>({});
    const [roomUsers, setRoomUsers] = useState<any>({});
    const roomRef = db.collection('UserRooms').doc(uid).collection('Rooms');

    useEffect(() => {
        // 접속할 수 있는 방을 나타내고 uid 를 통해 접속
        roomRef.onSnapshot((snapshot) => {
            const data = snapshot.docs.map((snapshot_doc) => {
                if (snapshot_doc.data().state){
                    return snapshot_doc.id
                }
            });
            data.filter((element) => element);
            setRooms([...data]);
        });
    }, []);

    useEffect(() => {
        let names = {};
        let users = {};
        rooms.forEach((roomId: string) => {
            // 이름을 찾아서 State에 적용
            const chatRef = db.collection('Chat').doc(roomId);
            chatRef.onSnapshot((snapshot_chat) => {
                if (snapshot_chat.data() && (snapshot_chat.data() as any).name){
                    names = {
                        ... names,
                        [roomId]: (snapshot_chat.data() as any).name,
                    };
                }
                setRoomNames(names);
            })
            // 유저 수를 찾아서 State에 적용
            chatRef.collection('Users').onSnapshot((snapshot_users) => {
                let inside = 0;
                snapshot_users.docs.forEach((user) => {
                    if(user.data() && user.data().state){
                        inside += 1;
                    }
                });
                users = {
                    ...users,
                    [roomId]: {
                        people: snapshot_users.docs.length,
                        inside
                    },
                };
                setRoomUsers(users);
            });
        }, {});
    }, [rooms]);

    return (
        <RoomListBox>
            {rooms.map((roomId: any, index: number) => {
                if (roomNames[roomId] && roomUsers[roomId]) {
                    const name = roomNames[roomId];
                    const { people, inside } = roomUsers[roomId];
                    return (
                        <RoomItem
                            key={index}
                            id={roomId}
                            name={name}
                            people={people}
                            inside={inside}
                            />
                    );
                }
            })}
        </RoomListBox>
    );
};

export default RoomList;