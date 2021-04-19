import React from 'react';
import MainBox from 'styles/main/MainBox';
import Header from 'components/main/Header';
import MainMenu from 'components/main/MainMenu';
import RoomList from 'components/main/RoomList';

const Main: React.FC = () => {
    return (
        <MainBox>
            <Header/>
            <MainMenu/>
            <RoomList/>
        </MainBox>
    );
};

export default Main;