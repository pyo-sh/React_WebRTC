import styled from 'styled-components';

export const SignUpWrapper = styled.div`
    width: 100vw;
    height: 100vh;

    display: flex;
    justify-content: center;
    align-items: center;
`;

const SignUpBox = styled.div`
    width: 500px;
    padding: 30px 60px;
    box-shadow: 0 0 45px rgba(102, 187, 106, 0.15);

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .SignUp-Section {
        width: 380px;
        margin-bottom: 20px;

        strong {
            width: 100%;
            color: #112d58;
        }

        p {
            width: 100%;
            height: 17px;
            padding: 0;
            margin: 5px 0 0 0;
            color: red;
            font-size: 13px;
        }
    }

    .SignUp-Profile-Section {
        width: 380px;
        margin: 15px 0;
        
        .SignUp-Profile-Title {
            font-weight: bold;
            color: #112d58;
        }

        .SignUp-Profile-Wrapper{
            width: 100%;
            padding: 10px;

            display: flex;
            justify-content: center;
            align-items: center;
        }
    }

    .SignUp-Image{
        width: 100px;
        height: 100px;
        margin-right: 10px;

        border: 1px solid #939393;
        border-radius: 50px;
    }

    .SignUp-Input {
        width: 100%;
        height: 50px;
        padding: 0 10px;
        margin-top: 5px;

        font-size: 16px;
        color: rgba(17, 45, 88, 0.9);
        border: 1px solid #112d58;

        :focus {
            border: 2px solid #112d58;
            border-radius: 5px;
        }
    }

    .SignUp-Button {
        width: 380px;
        height: 50px;
        padding: 0;
        margin: 20px 0;

        font-size: 16px;
        font-weight: 500;
        line-height: 1.5;
        border-radius: .5rem;
        border-color: rgba(102, 187, 106, 0.9);
        color: #fff;
        background-color: rgba(102, 187, 106, 0.9);
    }
`;

export default SignUpBox;