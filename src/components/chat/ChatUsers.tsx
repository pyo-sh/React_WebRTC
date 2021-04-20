import React, { useEffect, useState } from 'react';
import ChatUsersBox from 'styles/chat/ChatUsersBox';
import { db } from 'config/firebase';

type ChatUsersPropType = {
    id: string,
    users: any,
}

const ChatUsers: React.FC<ChatUsersPropType> = ({ id, users }) => {
    const [connections, setConnections] = useState<any>([]);

    const chatUserRef = db.collection('Chat').doc(id).collection('Users');

    useEffect(() => {
        let connection = {};
        Object.keys(users).map((userId) => {
            // User Online & Offline Snapshot
            chatUserRef.doc(userId).onSnapshot((snapshot_line) => {
                connection = {
                    ...connection,
                    [userId]: (snapshot_line.data() as any).state
                }
                setConnections(connection);
            }, (error) => console.error(error));
        }, []);
    // IF users Changed, We need to Change Memory Ref
    }, [users])

    const displayUsers = () => {
        return Object.keys(connections).map((userId, index) => {
            if(connections[userId]){
                const { name, profileImage } = users[userId];
                return (
                    <section className="ChatUser" key={index}>
                        <img className="ChatUser-Profile"
                            src={profileImage}
                            alt="User_Profile"
                            />
                        <p className="ChatUser-Name">
                            {name}
                        </p>
                    </section>
                );
            }
        })
    }

    return (
        <ChatUsersBox>
            {displayUsers()}
        </ChatUsersBox>
    );
};

export default ChatUsers;