import React from 'react';
import RoomItemBox from 'styles/main/RoomItemBox';
import { useHistory } from 'react-router-dom';

type RoomItemPropType = {
    id: string,
    name: string,
    people: number,
    inside: number,
}

const RoomItem: React.FC<RoomItemPropType> = ({ id, name, people, inside }) => {
    const history = useHistory();
    const onClickRoomItem = () => {
        history.push('/chat/' + id);
    }
    
    return (
        <RoomItemBox
            onClick={onClickRoomItem}
            >
            <h2 className="RoomItem-Title">{name}</h2>
            <div className="RoomItem-People">참여자 수 : {inside} / {people}</div>
        </RoomItemBox>
    );
};

export default RoomItem;