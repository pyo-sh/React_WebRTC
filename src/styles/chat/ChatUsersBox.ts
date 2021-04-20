import styled from 'styled-components';

const ChatUsersBox = styled.div`
    width: 100%;
    height: 200px;
    padding: 10px;
    margin-bottom: 10px;

    display: flex;
    flex-direction: column;

    background-color: #ffffff;
    border-radius: 10px;

    .ChatUser{
        display: flex;
        flex-wrap: nowrap;
        align-items: center;
    }

    .ChatUser-Profile {
        width: 40px;
        height: 40px;
        margin: 0 10px;

        border-radius: 50%;
    }

    .ChatUser-Name {
        margin: 0;
        flex: 1;
        overflow: hidden;
    }
`;

export default ChatUsersBox;