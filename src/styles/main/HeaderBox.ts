import styled from 'styled-components';

const HeaderBox = styled.div`
    width: 100%;
    height: 75px;
    padding: 0 30px;

    position: absolute;
    top: 0;
    left: 0;

    display: flex;
    justify-content: space-between;
    align-items: center;

    color: #f8f8f8;
    background-color: #66bb6a;
    box-shadow: 0 1px 2.94px 0.06px rgb(4 26 55 / 16%);

    .Header-Button {
        width: 115px;
        height: 45px;
        padding: 0;

        font-size: 16px;
        font-weight: 500;
        line-height: 1.5;
        border-radius: .5rem;
        border-color: rgba(31, 21, 52, 0.85);
        color: #fff;
        background-color: rgba(31, 21, 52, 0.85);
    }

    .Header-Logo{
        font-family: 'Dancing Script', cursive;
        
        -ms-user-select: none; 
        -moz-user-select: -moz-none;
        -khtml-user-select: none;
        -webkit-user-select: none;
        user-select: none;

        font-size: 40px;
        color: #f8f8f8;
    }
    .Header-Profile{
        display: flex;
        align-items: center;
    }
    .Header-Profile-Image{
        width: 50px;
        height: 50px;

        border-radius: 50%;
    }
    .Header-Profile-Name{
        width: 100px;
        height: 25px;
        margin: 0;
        margin-left: 20px;
        
        font-size: 16px;
        color: #f8f8f8;
        overflow: hidden;

        display: flex;
        align-items: center;
        flex-wrap: nowrap;

        strong {
            padding-left: 5px;
        }
    }
`;

export default HeaderBox;