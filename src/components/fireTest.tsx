import React, { useState, useEffect } from 'react';
import { db, firebaseApp } from 'config/firebase';

const FireTest: React.FC = () => {
    const [chats, setChats] = useState<Array<any>>([]);
    const [text, setText] = useState<string>('');

    // 로그인 기능 구현
    const login = () => {
        const email = '', password = '';
        firebaseApp.auth().signInWithEmailAndPassword(email, password)
        .then((user) => {
            const uid = (firebaseApp.auth().currentUser || {}).uid; 
            if (uid) {
                // login status
                // set uid
            }
            else {
                // error
            }
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });

        /*
        // 브라우저 내에 저장되어 있다면 (auth().signOut()을 한게 아니라면)
        // Current User를 불러올 수 있다.
        // 처음 Refresh될 때 실행되야 한다.
        // Redux 혹은 App의 UseEffect 에서 가지고 있어야 한다.
        firebaseApp.auth().onAuthStateChanged((user) => {
            const uid = (firebaseApp.auth().currentUser || {}).uid; 
            if (uid) {
                // login status
                // set uid
            }
            else {
                // error
            }
        })
        */
    }

    // 회원가입 하기~~
    const signup = () => {
        const email = '', password = '';
        firebaseApp.auth().createUserWithEmailAndPassword(email, password)
        .then((user) => {
            const uid = (firebaseApp.auth().currentUser || {}).uid;
            if (uid) {
                // ~~
            }
            else {
                // error
            }
        })
        .catch((error) => {
            console.error(error);
        });

    }

    // 로그아웃
    const logout = () => {
        firebaseApp.auth().signOut();
    }


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