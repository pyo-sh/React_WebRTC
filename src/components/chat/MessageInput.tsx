import React, { useRef, useState } from 'react';
import MessageInputBox from 'styles/chat/MessageInputBox';
import { db } from 'config/firebase';
import { useSelector } from 'react-redux';
import { RootState } from 'reducers';

type MessageInputPropType = {
    id: string
}

const MessageInput: React.FC<MessageInputPropType> = ({ id }) => {
    const { uid } = useSelector((state: RootState) => state.user);
    const [inputString, setInputString] = useState<string>('');

    const chatMessageRef = db.collection('Chat').doc(id).collection('Messages');

    // Auto TextArea Height
    const textArea = useRef<HTMLTextAreaElement>(null);
    const resize = () => {
        const element = textArea.current;
        if( element ) {
            element.style.height = '5px';
            element.style.height = (element.scrollHeight + 2).toString() + 'px';
        }
    }

    // Sending Message
    const onClickSend = () => {
        if (inputString) {
            setInputString('');
            chatMessageRef.add({
                content: inputString,
                from: uid,
                timeStamp: new Date().getTime(),
            })
            .then(() => {
                // Set After Message
                // console.log(ref);
                console.log("Sending Message Complete");
            });
        }
    }

    // Press Enter without Shift
    const pressedEnter = (event: any) => {
        if(event.keyCode == 13 && event.shiftKey == false) {
            event.preventDefault();
            onClickSend();
        }
        resize();
    }

    return (
        <MessageInputBox>
            <textarea
                ref={textArea}
                className="Delete-Input MessageInput-Input"
                onKeyUp={resize}
                onKeyDown={pressedEnter}
                onChange={(event) => setInputString(event.target.value)}
                value={inputString}
                />
            <button
                className="Delete-Button MessageInput-Button"
                onClick={onClickSend}
                >
                ⤶
            </button>
        </MessageInputBox>
    );
}

export default MessageInput;