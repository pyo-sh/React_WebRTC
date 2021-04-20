import React, { useEffect, useState } from 'react';
import MessagesBox from 'styles/chat/MessagesBox';

type MessagesPropType = {
    id: string,
    users: Object,
}

const Messages: React.FC<MessagesPropType> = ({ id, users }) => {
    return (
        <MessagesBox>
            
        </MessagesBox>
    );
}

export default Messages;