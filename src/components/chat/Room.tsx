import React from 'react';
import RoomBox from 'styles/chat/RoomBox';

const Room: React.FC = ({ match }: any) => {
    return (
        <RoomBox>
            {match.params.id}
        </RoomBox>
    );
};

export default Room;