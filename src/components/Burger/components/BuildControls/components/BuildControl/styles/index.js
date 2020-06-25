import styled from 'styled-components';

const BuildControlContainer = styled.div `
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 5px 0;

    &button {
        display: block;
        font: inherit;
        padding: 5px;
        margin: 0 5px;
        width: 80px;
        border: 1px solid #AA6817;
        cursor: pointer;
        outline: none;
    }

    &button:disabled {
        background-color: #AC9980;
        border: 1px solid #7E7365;
        color: #ccc;
        cursor: default;
    }

    &button:hover:disabled {
        background-color: #AC9980;
        color: #ccc;
        cursor: not-allowed;
    }
`;

const BuildControlLabelContainer = styled.div`
    padding: 10px;
    font-weight: bold;
    width: 80px;
`;

export { BuildControlContainer, BuildControlLabelContainer };