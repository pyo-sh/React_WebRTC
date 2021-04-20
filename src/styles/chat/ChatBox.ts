import styled from 'styled-components';

const ChatBox = styled.div`
    min-width: 300px;
    height: 100vh;
    padding: 10px;

    display: flex;
    flex-direction: column;

    background-color: #eff5f7;
    box-shadow: 0 1px 20px 0 rgb(69 90 100 / 8%);

    .Chat-Message-Wrapper {
        width: 100%;
        height: 70%;
        padding: 10px;
        flex: 1;

        display: flex;
        flex-direction: column;
        justify-content: flex-end;

        background-color: #ffffff;
        border-radius: 10px;
    }
`;

export default ChatBox;