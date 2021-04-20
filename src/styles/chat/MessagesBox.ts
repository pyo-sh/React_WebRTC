import styled from 'styled-components';

const MessagesBox = styled.ul`
    width: 300px;
    height: 100%;
    padding: 10px 0;
    margin: 0;
    list-style: none;
    overflow: auto;
    /* overflow-y: hidden; */

    display: flex;
    flex-direction: column-reverse;

    .Message-Wrapper {
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
    }

    .Message-User {
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }
    
    .Message-User-Image {
        width: 30px;
        height: 30px;
        margin: 0 10px 0 0;

        border-radius: 50%;
    }

    .Message-User-Name {
        margin: 0;
        flex: 1;
        text-overflow: ellipsis;
        overflow: hidden;

        font-size: 12px;
    }

    .Message-Content {
        margin: 5px 0 10px 20px;
        
        word-break: break-all;
        white-space: normal;
    }
`;

export default MessagesBox;