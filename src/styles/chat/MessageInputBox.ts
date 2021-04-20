import styled from 'styled-components';

const MessageInputBox = styled.div`
    min-height: 25px;
    margin-top: 10px;

    display: flex;
    justify-content: flex-end;

    .MessageInput-Input {
        min-height: 25px;
        height: 25px;

        resize: none;
        flex: 1;
        border: 1px solid rgba(102, 187, 106, 0.9);
        border-radius: 5px;
        overflow: hidden;
    }

    .MessageInput-Button {
        width: 40px;
        height: 100%;

        color: #ffffff;
        background-color: rgba(102, 187, 106, 0.9);
        border-radius: 5px;
    }
`;

export default MessageInputBox;