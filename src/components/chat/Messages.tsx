import React, { useEffect, useState } from 'react';
import MessagesBox from 'styles/chat/MessagesBox';

type MessagesPropType = {
    id: string,
    users: Array<any>,
}

const Messages: React.FC<MessagesPropType> = ({ id, users }) => {
    return (
        <MessagesBox>
            
        </MessagesBox>
    );
}

export default Messages;