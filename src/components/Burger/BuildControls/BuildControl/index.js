import React from 'react';
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

const BuildControlButtonLess = styled.button`
    background-color: #D39952;
    color: white;

    &:hover, :active {
        background-color: #DAA972;
        color: white;
    }

    &:disabled {
        background-color: #DEE908;
        color: black;
        pointer-events: none;
    }
`;

const BuildControlButtonMore = styled.button`
    background-color: #8F5E1E;
    color: white;

    &:hover, :active {
        background-color: #99703F;
        color: white;
    }
`;

const BuildControl = (props) => (
    <BuildControlContainer>
        <BuildControlLabelContainer>{props.label}</BuildControlLabelContainer>
        <BuildControlButtonLess onClick={props.removed} disabled={!props.disabled.count}>Less -</BuildControlButtonLess>
        <BuildControlButtonMore onClick={props.added} >More +</BuildControlButtonMore>
    </BuildControlContainer>
);

export default BuildControl;