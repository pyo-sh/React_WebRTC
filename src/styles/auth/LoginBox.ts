import styled from 'styled-components';

export const LoginWrapper = styled.div`
    width: 100vw;
    height: 100vh;

    display: flex;
    justify-content: center;
    align-items: center;
`;

const LoginBox = styled.div`
    width: 500px;
    padding: 30px 60px;
    box-shadow: 0 0 45px rgba(102, 187, 106, 0.15);

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .Login-Logo {
        width: 100%;
        margin: 40px 0 65px 0;
        font-family: 'Dancing Script', cursive;

        // 드래그 못하게
        -ms-user-select: none; 
        -moz-user-select: -moz-none;
        -khtml-user-select: none;
        -webkit-user-select: none;
        user-select: none;

        text-align: center;
        font-size: 50px;
        color: #0BAC56;
    }

    .Login-Inputs {
        width: 380px;
        margin-bottom: 20px;
        border: 1px solid #112d58;

        hr {
            margin: 0;
            border: none;
            border-bottom: 1px solid #112d58;
        }
    }

    .Login-Error{
        width: 100%;
        padding: 0;
        margin: 0;
        margin-bottom: 20px;

        text-align: center;
        color: red;
    }

    .Login-Button {
        width: 380px;
        height: 50px;
        padding: 0;
        margin-bottom: 20px;

        font-size: 16px;
        font-weight: 500;
        line-height: 1.5;
        border-radius: .5rem;
        border-color: rgba(102, 187, 106, 0.9);
        color: #fff;
        background-color: rgba(102, 187, 106, 0.9);
    }

    .Login-Input {
        width: 100%;
        height: 50px;
        padding: 0 10px;

        font-size: 16px;
        color: rgba(17, 45, 88, 0.9);

        :focus {
            border: 1px solid #112d58;
            border-radius: 5px;
        }
    }

    .Login-SubClick{
        width: 100%;
        display: flex;
        justify-content: flex-end;

        a {
            color: #939393;
            text-decoration:none;

            :focus {
                color: #777d92;
            }
        }
    }
`;

export default LoginBox;