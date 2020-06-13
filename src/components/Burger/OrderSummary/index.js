import React from 'react';

import { ChildrenContainer } from '../../../hoc';

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

    return (
        <ChildrenContainer>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Continue to Checkout?</p>
        </ChildrenContainer>
    );
};

export default OrderSummary;
