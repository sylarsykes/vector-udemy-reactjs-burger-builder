import React from 'react';
import {
    ButtonLessStyled, ButtonMoreStyled, ButtonDangerStyled,
    ButtonSuccessStyled, ButtonOrderStyled
} from '../styles';

/**
 * Available buttons
 */
const AvailableButtons = {
    simple: 'simple',
    less: 'less',
    more: 'more',
    danger: 'danger',
    success: 'success',
    order: 'order'
}

/**
 * Button functional component
 * 
 * @param {*} props
 *      Object with structure
 *          buttonType AvailableButtons type
 *          children Children content
 *          buttonStyled ButtonStyled object
 *          ... React props for button 
 */
const ButtonFC = (props) => {

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

export default ButtonFC;
export { AvailableButtons };