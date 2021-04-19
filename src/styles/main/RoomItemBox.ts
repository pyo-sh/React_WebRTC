import styled from 'styled-components';

const RoomItemBox = styled.div`
    padding: 20px;

    background-color: #ffffff;
    box-shadow: 0 1px 20px 0 rgb(69 90 100 / 8%);
    border-radius: 3px;
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