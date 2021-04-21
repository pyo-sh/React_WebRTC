import React from 'react';
import ChatBox from 'styles/chat/ChatBox';
import ChatUsers from 'components/chat/ChatUsers';
import Messages from 'components/chat/Messages';
import MessageInput from 'components/chat/MessageInput';
import RoomButton from 'components/chat/RoomButton';

type ChatPropType = {
    id: string,
    users: any,
}

const Chat: React.FC<ChatPropType> = ({ id, users }) => {
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