import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
    }
    head, script{
        display:none;
    }
    body{
        margin: 0;
        font-family: 'Noto Sans KR', sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    .Delete-Button {
        background: none;
        border: none;
        outline: none;
        cursor: pointer;
    }

    .Delete-Input {
        background: none;
        border: none;
        outline: none;
    }
`;

export default GlobalStyle;