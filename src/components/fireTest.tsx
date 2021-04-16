import React, { useState, useEffect } from 'react';
import { db, firebaseApp } from 'config/firebase';

const FireTest: React.FC = () => {
    const [chats, setChats] = useState<Array<any>>([]);
    const [text, setText] = useState<string>('');

    // get Database
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

    // send Database
    // add
    const addDocument = () => {
        db
            .collection('chat')
            .add({
                content: text
            })
            .then((ref) => {
                console.log(ref);
            });
    }
    //


    return <div>
        {
            chats.map((chat) => {
                return <div>
                    {chat.id} : {chat.content}
                </div>
            })
        }
        <textarea onChange={(evt) => setText(evt.target.value)} value={text}></textarea>
        <button onClick={addDocument}>add</button>
    </div>;
}

export default FireTest;