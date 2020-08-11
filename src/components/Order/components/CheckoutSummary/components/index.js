import React from 'react';
import { CheckoutSummaryContainer, CheckoutSummaryBurgerContainer } from '../styles';
import { AvailableButtons } from '../../../../constants';
import { BurgerFC, ButtonFC } from '../../../../functional-components';

/**
 * Checkout summary functional component
 * 
 * @param {*} props 
 */
export const CheckoutSummaryFC = (props) => (
    <CheckoutSummaryContainer>
        <h1>We hope it tastes well!</h1>
        <CheckoutSummaryBurgerContainer>
            <BurgerFC ingredients={props.ingredients} />
        </CheckoutSummaryBurgerContainer>
        <p><strong>Total Price: {props.totalPrice}</strong></p>
        <ButtonFC 
            buttonType={AvailableButtons.danger} 
            clickFuncCB={props.checkoutCancelled}>
                CANCEL
        </ButtonFC>
        <ButtonFC 
            buttonType={AvailableButtons.success} 
            clickFuncCB={props.checkoutContinued}>
                CONTINUE
        </ButtonFC> 
    </CheckoutSummaryContainer>
);
