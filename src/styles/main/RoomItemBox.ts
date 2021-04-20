import styled from 'styled-components';

const RoomItemBox = styled.div`
    margin-top: 15px;
    padding: 20px;
    :first-child {
        margin-top: 0;
    }

    background-color: #ffffff;
    box-shadow: 0 1px 20px 0 rgb(69 90 100 / 8%);
    border-radius: 10px;
    cursor: pointer;

    .RoomItem-Title {
        margin: 0 0 8px;
        color: #66bb6a;
    }

    .RoomItem-People {
        color: #7D7987;
    }
`;

export default RoomItemBox;