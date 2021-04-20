import React, { useEffect, useState, useRef } from 'react';
import MessagesBox from 'styles/chat/MessagesBox';
import { db } from 'config/firebase';

type MessagesPropType = {
    id: string,
    users: any,
}

const Messages: React.FC<MessagesPropType> = ({ id, users }) => {
    const chatRef = db.collection('Chat').doc(id).collection('Messages');
    const [chats, setChats] = useState<Array<any>>([]);

    useEffect(() => {
        chatRef.orderBy('timeStamp', 'desc').onSnapshot((snapshot) => {
            const data = snapshot.docs.map((snapshot_message) => {
                return snapshot_message.data();
            });
            setChats(data);
        }, (error) => console.error(error));
    }, [id]);

    return (
        <MessagesBox>
            {users && chats.map((message, index) => {
                if (users[message.from]) {
                    const { name, profileImage } = users[message.from];
                    return (
                        <li className="Message-Wrapper" key={index}>
                            <section className="Message-User">
                                <img className="Message-User-Image" src={profileImage} alt="Profile_Image"/>
                                <p className="Message-User-Name">{name}</p>
                            </section>
                            <p className="Message-Content">
                                {message.content}
                            </p>
                        </li>
                    );
                }
            })}
        </MessagesBox>
    );
}

export default Messages;