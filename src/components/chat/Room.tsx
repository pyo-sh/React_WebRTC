import React from 'react';
import RoomBox from 'styles/chat/RoomBox';
import Test from 'components/test';

const Room: React.FC = ({ match }: any) => {
    return (
        <RoomBox>
            {match.params.id}
            <Test/>
        </RoomBox>
    );
};

export default Room;