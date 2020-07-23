import React from 'react';
import { v4 as uuidv4 } from "uuid";
import ChildrenContainer from '../../../../../hoc';
import { AvailableButtons } from '../../../../constants';
import { ButtonFC } from '../../../../functional-components';

/**
 * Order summary component
 */
const OrderSummaryComponent = (props) => {

    const { ingredients, price, purchaseCancelled, purchaseContinued  } = props;

    const ingredientSummary = ingredients.map((ingredient) => {
        const { count, burgerIngredient } = ingredient;

        if (!count) {
            return '';
        }

        return (
            <li key={uuidv4()}>
                <span>{burgerIngredient.label}</span>
                <br />
                <span>Count: {count}</span>
            </li>
        );
    });

    return (
        <ChildrenContainer>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: {price}</strong></p>
            <p>Continue to Checkout?</p>
            <ButtonFC buttonType={AvailableButtons.danger} clickFuncCB={purchaseCancelled}>CANCEL</ButtonFC>
            <ButtonFC buttonType={AvailableButtons.success} clickFuncCB={purchaseContinued}>CONTINUE</ButtonFC>
        </ChildrenContainer>
    );
};

export default OrderSummaryComponent;
