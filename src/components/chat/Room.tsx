import React, { useState, useEffect } from 'react';
import RoomBox from 'styles/chat/RoomBox';
import Chat from 'components/chat/Chat';
import Agora from 'components/agora/Agora';
import { db, firebaseApp } from 'config/firebase';
import { useSelector } from 'react-redux';
import { RootState } from 'reducers';

const isOfflineForFirestore = {
    state: false,
};

const isOnlineForFirestore = {
    state: true,
}


const Room: React.FC = ({ match }: any) => {
    const { uid } = useSelector((state: RootState) => state.user);
    const { id } = match.params;
    const [ users, setUsers ] = useState<Object>({});

    // Using for get Users
    const chatUserRef = db.collection('Chat').doc(id).collection('Users');
    const userRef = db.collection('User');

    // Using for Onlines
    const userStatusFirestoreRef = db.collection('Chat').doc(id).collection('Users').doc(uid);
    const userStatusDatabaseRef = firebaseApp.database().ref('/status/' + uid);

    useEffect(() => {
        const leaveEvent = () => {
            userStatusDatabaseRef.set(isOfflineForFirestore);
            userStatusFirestoreRef.set(isOfflineForFirestore);
        }
        window.addEventListener('unload', leaveEvent)
        // IF Unmount, disconnect
        return () => {
            leaveEvent();
            window.removeEventListener('unload', leaveEvent);
        }
    }, []);
    useEffect(() => {
        // Setting User Connection
        // ref('.info/connected') 에서는 연결됐다면 true, 안됐다면 false를 반환할 것이다.
        firebaseApp.database().ref('.info/connected').on('value', (snapshot) => {
            console.log('Database Connected : ', snapshot.val())
            if (snapshot.val() == false) {
                // Instead of simply returning, we'll also set Firestore's state
                // to 'offline'. This ensures that our Firestore cache is aware
                // of the switch to 'offline.'
                userStatusFirestoreRef.set(isOfflineForFirestore);
                return;
            }
            // Database의 onDisconnect 기능을 사용하기 위해 사용자의 status를 저장
            userStatusDatabaseRef.onDisconnect().set(isOfflineForFirestore)
            .then(() => {
                // onDisconnect 될 때 까지 일단 Database에 state 를 online으로 설정
                userStatusDatabaseRef.set(isOnlineForFirestore);
                userStatusFirestoreRef.set(isOnlineForFirestore);
            });
        });

        // User Plus & Added Snapshot
        chatUserRef.onSnapshot((snapshot) => {
            // Get All User IDs
            const usersId = snapshot.docs.map((user) => user.id);
            let userData = {} as any;
            // Get User Informations
            usersId.forEach((userId) => {
                userRef.doc(userId).onSnapshot((snapshot_user) => {
                    userData = {
                        ...userData,
                        [userId]: snapshot_user.data(),
                    };
                    setUsers(userData);
                })
            });
        });
    }, [id]);

    return (
        <RoomBox>
            <Agora
                roomId={id}
                users={users}
                />
            <Chat
                id={id}
                users={users}
                />
        </RoomBox>
    );
};

export default Room;