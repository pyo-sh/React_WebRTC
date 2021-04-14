import React, { useState, useEffect } from 'react';
import { db, firebaseApp } from 'config/firebase';

const FireTest: React.FC = () => {
const [chats, setChats] = useState<Array<any>>([]);

    useEffect(() => {
        const chatRef = db.collection('chat');

        console.log(chatRef);
        chatRef.onSnapshot((snapshot) => {
            // console.log(snapshot.docs);
            const data = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            // console.log(data);
            setChats(data);
        })
    }, []);

    return <div>
        {
            chats.map((chat) => {
                return <div>
                    {chat.id} : {chat.content}
                </div>
            })
        }
    </div>;
}

export default FireTest;