import React from 'react';

import { ChildrenContainer } from '../../../hoc';
import { Button, AvailableButtons } from '../../';

const OrderSummary = (props) => {
    const ingredientSummary = props.ingredients.map((ingredient, index) => {
        if (!ingredient.count) {
            return '';
        }

        return (
            <li key={index}>
                <span>{ingredient.type.label}</span>
                <span>Count: {ingredient.count}</span>
            </li>
        );
    });

    console.log(props);

    return (
        <ChildrenContainer>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Continue to Checkout?</p>
            <Button buttonType={AvailableButtons.danger} clickFuncCB={props.purchaseCancelled}>CANCEL</Button>
            <Button buttonType={AvailableButtons.success} clickFuncCB={props.purchaseContinued}>CONTINUE</Button>
        </ChildrenContainer>
    );
};

export default OrderSummary;
