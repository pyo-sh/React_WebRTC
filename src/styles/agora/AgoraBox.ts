import styled from 'styled-components';

const AgoraBox = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;

    .Agora-Videos {
        width: 100%;
        height: 100%;
        max-height: 100vh;
        margin: 0;
        padding: 10px;

        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;

        list-style: none;
        background-color: #333333;
    }

    .Agora-Stream{
        width: 100%;
        height: 100%;
        flex-grow: 1;
        flex-basis: 30%;
        max-width: 50%;
        margin: 5px;
        background-color: black;
        border-radius: 5px;
        overflow: hidden;

        .Agora-Player-Image-Wrapper {
            width: 100%;
            height: 100%;

            display: flex;
            justify-content: center;
            align-items: center;
            .Agora-Player-Image {
                width: 75px;
                height: 75px;
                border-radius: 50%;
            }
        }

        .Agora-Player-Name {
            z-index: 5;
            width: 50px;
            height: 30px;
            margin: 0;
            position: absolute;
            color: white;
            overflow: hidden;
            text-overflow: ellipsis;
            background: rgba(0, 0, 0, 0.5);
            border-radius: 3px;
        }

        div{
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            video{
                // 비디오 크기가 비율에 맞게 정사각형 안에 들어가도록 함
                position: relative !important;
                object-fit: contain !important;
            }
        }
    }

    .Agora-Controller {
        width: 100%;
        height: 50px;
        background-color: black;
        opacity: 0.4;
    }
`;

export default AgoraBox;