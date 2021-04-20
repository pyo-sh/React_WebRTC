import React, { useEffect, useState } from 'react';
import ChatUsersBox from 'styles/chat/ChatUsersBox';
import { db } from 'config/firebase';

type ChatUsersPropType = {
    users: Array<any>,
}

const ChatUsers: React.FC<ChatUsersPropType> = ({ users }) => {
    const [connectedUsers, setConnectedUsers] = useState<Array<any>>([]);

    useEffect(() => {
        const userData = users.filter((element) => element.state === true);
        setConnectedUsers(userData);
        console.log(userData);
    }, []);

    return (
        <ChatUsersBox>
            {connectedUsers.map((user, index) => (
                <section className="ChatUser" key={index}>
                    <img className="ChatUser-Profile"
                        src={user.profileImage}
                        alt="User_Profile"
                        />
                    <p className="ChatUser-Name">
                        {user.name}
                    </p>
                </section>
            ))}
        </ChatUsersBox>
    );
};

export default ChatUsers;