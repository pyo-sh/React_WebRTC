import styled from 'styled-components';

export const UserAddModal = styled.div`
    width: 320px;
    padding: 10px;
    margin-top: -100px;
    margin-left: -10px;
    position: absolute;
    z-index: 1;
    background-color: #e0e3e9;
    border-radius: 10px;

    display: flex;
    flex-direction: column;

    .UserAddModal-Title {
        margin: 0 0 15px 0;
        color: rgba(17,45,88,0.9);
    }

    .UserAddModal-Section {
        width: 100%;
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }

    .UserAddModal-Input {
        width: 100%;
        height: 30px;
        margin-left: 10px;
        padding-left: 10px;
        flex: 1;
        background-color: #ffffff;
        border-radius: 5px;
    }
    .UserAddModal-Button {
        width: 50px;
        height: 30px;

        background-color: rgba(102,187,106,0.9);
        color: white;
        border-radius: 5px;
    }
`;

const RoomButtonBox = styled.div`
    width: 100%;
    min-height: 50px;
    margin: 10px 0 0 0;
    padding: 7.5px 10px;

    display: flex;
    justify-content: space-between;

    background-color: #ffffff;
    border-radius: 10px;

    .RoomButton-Button {
        width: 48%;
        height: 35px;
        color: #ffffff;
        font-weight: bold;
        border-radius: 10px;
    }

    .RoomButton-Red {
        background-color: rgba(254, 77, 77, 0.9)
    }
    .RoomButton-Green {
        background-color: rgba(102, 187, 106, 0.9)
    }
`;

export default RoomButtonBox;