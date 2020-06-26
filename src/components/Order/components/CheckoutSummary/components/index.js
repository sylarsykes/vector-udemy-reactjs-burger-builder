import React from 'react';
import { CheckoutSummaryContainer, CheckoutSummaryBurgerContainer} from '../styles';

import { BurgerFC } from '../../../../Burger';
import { ButtonFC, AvailableButtons } from '../../../../UI';

/**
 * Checkout summary functional component
 * 
 * @param {*} props 
 */
const CheckoutSummaryFC = (props) => (
    <CheckoutSummaryContainer>
        <h1>We hope it tastes well!</h1>
        <CheckoutSummaryBurgerContainer>
            <BurgerFC ingredients={props.ingredients} />
        </CheckoutSummaryBurgerContainer>
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

export default CheckoutSummaryFC;
