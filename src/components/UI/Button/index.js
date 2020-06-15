import React from 'react';
import styled, { keyframes } from 'styled-components';

const AvailableButtons = {
    simple: 'simple',
    less: 'less',
    more: 'more',
    danger: 'danger',
    success: 'success',
    order: 'order'
}

const ButtonLessStyled = styled.button.attrs(props => ({
    ...props.buttonStyled
}))`
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

const ButtonMoreStyled = styled.button.attrs(props => ({
    ...props.buttonStyled
}))`
    background-color: #8F5E1E;
    color: white;

    &:hover, :active {
        background-color: #99703F;
        color: white;
    }
`;

const ButtonDangerStyled = styled.button.attrs(props => ({
    ...props.buttonStyled
}))`
    background-color: transparent;
    border: none;
    color: #944317;
    outline: none;
    cursor: pointer;
    font: inherit;
    padding: 10px;
    margin: 10px;
    font-weight: bold;

    &:first-of-type {
        margin-left: 0;
        padding-left: 0;
    }
`;

const ButtonSuccessStyled = styled.button.attrs(props => ({
    ...props.buttonStyled
}))`
    background-color: transparent;
    border: none;
    color: #5C9210;;
    outline: none;
    cursor: pointer;
    font: inherit;
    padding: 10px;
    margin: 10px;
    font-weight: bold;

    &:first-of-type {
        margin-left: 0;
        padding-left: 0;
    }

`;

const enableButton = keyframes `
    0% {
        transform: scale(1);
    }
    60% {
        transform: scale(1.1);
    }
    100% {
        transform: scale(1);
    }
`;

const ButtonOrderStyled = styled.button.attrs(props => ({
    ...props.buttonStyled
}))`
    background-color: ${props => props.backgroundColor ? props.backgroundColor :  '#DAD735'};
    outline: none;
    cursor: pointer;
    border: 1px solid ${props => props.borderColor ? props.borderColor : '#966909'};
    color: ${props => props.color ? props.color : '#966909'};
    font-family: inherit;
    font-size: ${props => props.fontSize ? props.fontSize : '1.2em'};
    padding: 15px 30px;
    box-shadow: 2px 2px 2px ${props => props.boxShadowcolor ? props.boxShadowcolor : '#966909'};

    &:hover {
        background-color: ${props => props.hoverBackgroundColor ? props.hoverBackgroundColor : '#A0DB41'};
        border: 1px solid ${props => props.hoverBorderColor ? props.hoverBorderColor : '#966909'};
        color: ${props => props.hoverColor ? props.hoverColor : '#966909'};
    }

    &:actve {
        background-color: ${props => props.activeBackgroundColor ? props.activeBackgroundColor : '#A0DB41'};
        border: 1px solid ${props => props.activeBorderColor ? props.activeBorderColor : '#966909'};
        color: ${props => props.activeColor ? props.activeColor : '#966909'};
    }

    &:disabled {
        background-color: ${props => props.disabledBackgroundColor ? 
                props.disabledBackgroundColor : '#C7C6C6'};
        cursor: not-allowed;
        border: 1px solid ${props => props.disabledBorderColor ? props.disabledBorderColor : '#CCC'};
        color: ${props => props.disabledColor ? props.disabledColor : '#888888'};
    }

    &:not(:disabled) {
        animation: ${enableButton} 0.3s linear;
    }
`;

const Button = (props) => {

    const buttonType = props.buttonType || AvailableButtons.order;
    const { children, buttonStyled, ...buttonProps } = props;

    if (buttonType === AvailableButtons.less) {
        return (
            <ButtonLessStyled
                {...buttonProps}
                buttonStyled={{...buttonStyled}}
                onClick={buttonProps.clickFuncCB}
            >
                {children}
            </ButtonLessStyled>
        );
    } else if (buttonType === AvailableButtons.more) {
        return (
            <ButtonMoreStyled
                {...buttonProps}
                buttonStyled={{...buttonStyled}}
                onClick={buttonProps.clickFuncCB}>
                {children}
            </ButtonMoreStyled>
        );
    } else if(buttonType === AvailableButtons.danger) {
        return (
            <ButtonDangerStyled
                {...buttonProps} 
                buttonStyled={{...buttonStyled}} 
                onClick={buttonProps.clickFuncCB} 
            >
                {children}
            </ButtonDangerStyled>
        );
    } else if (buttonType === AvailableButtons.success) {
        return (
            <ButtonSuccessStyled
                {...buttonProps} 
                buttonStyled={{...buttonStyled}} 
                onClick={buttonProps.clickFuncCB} 
            >
                {children}
            </ButtonSuccessStyled>
        );
    } else {
        return (
            <ButtonOrderStyled 
                {...buttonProps} 
                buttonStyled={{...buttonStyled}} 
                onClick={buttonProps.clickFuncCB} 
            >
                {children}
            </ButtonOrderStyled>
        );
    }

};

export default Button;
export { AvailableButtons };