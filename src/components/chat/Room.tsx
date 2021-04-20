import React from 'react';
import RoomBox from 'styles/chat/RoomBox';
import Chat from 'components/chat/Chat';
import Test from 'components/test';

const Room: React.FC = ({ match }: any) => {
    return (
        <RoomBox>
            <Test/>
            <Chat
                id={match.params.id}
                />
        </RoomBox>
    );
};

export default Room;