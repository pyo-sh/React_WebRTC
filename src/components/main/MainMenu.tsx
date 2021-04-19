import React, { useState } from 'react';
import MainMenuBox from 'styles/main/MainMenuBox';

const MainMenu: React.FC = () => {
    const [name, setName] = useState<string>('');

    return (
        <MainMenuBox>
            <section>
                <div className="MainMenu-Name-Title">채팅 이름</div>
                <input
                    className="Delete-Button MainMenu-Name-Input"
                    placeholder="채팅 이름"
                    onChange={(event) => {setName(event.target.value)}}
                    value={name}
                    />
            </section>
        </MainMenuBox>
    );
};

export default MainMenu;