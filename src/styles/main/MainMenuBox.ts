import styled from 'styled-components';

const MainMenuBox = styled.div`
    min-width: 300px;
    height: 100%;
    padding: 30px 10px 10px;
    background-color: #ffffff;
    
    display: absolute;

    .MainMenu-Name-Title {
        font-size: 16px;
        margin-bottom: 10px;
    }

    .MainMenu-Name-Input {
        width: 250px;
        height: 40px;
        padding: 0 10px;

        font-size: 14px;
        color: rgba(17, 45, 88, 0.9);
        border-bottom: 1px solid #112d58;

        :focus {
            border: 2px solid #112d58;
            border-radius: 5px;
        }
    }
`;

export default MainMenuBox;