import React, { useState, useEffect } from 'react';
import ChatBox from 'styles/chat/ChatBox';
import ChatUsers from 'components/chat/ChatUsers';
import Messages from 'components/chat/Messages';
import MessageInput from 'components/chat/MessageInput';
import RoomButton from 'components/chat/RoomButton';
import { db, firebaseApp } from 'config/firebase';
import { useSelector } from 'react-redux';
import { RootState } from 'reducers';

type ChatPropType = {
    id: string
}

const isOfflineForFirestore = {
    state: false,
};

const isOnlineForFirestore = {
    state: true,
}

const Chat: React.FC<ChatPropType> = ({ id }) => {
    const { uid } = useSelector((state: RootState) => state.user);
    const [ users, setUsers ] = useState<Object>({});

    // Using for get Users
    const chatUserRef = db.collection('Chat').doc(id).collection('Users');
    const userRef = db.collection('User');

    // Using for Onlines
    const userStatusFirestoreRef = db.collection('Chat').doc(id).collection('Users').doc(uid);
    const userStatusDatabaseRef = firebaseApp.database().ref('/status/' + uid);

    useEffect(() => {
        // IF Unmount, disconnect
        return () => {
            userStatusDatabaseRef.set(isOfflineForFirestore);
            userStatusFirestoreRef.set(isOfflineForFirestore);
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
        <ChatBox>
            <ChatUsers
                id={id}
                users={users}
                />
            <section className="Chat-Message-Wrapper">
                <Messages
                    id={id}
                    users={users}
                    />
                <MessageInput
                    id={id}
                    />
            </section>
            <RoomButton
                id={id}
                />
        </ChatBox>
    );
}

export default Chat;