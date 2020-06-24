import React, { Component } from 'react';
import { v4 as uuidv4 } from "uuid";

import ChildrenContainer from '../../../../hoc';
import { Button, AvailableButtons } from '../../../';

class OrderSummaryComponent extends Component {

    componentWillUpdate = () => console.log('[Order Summary] Will Update');

    render = () => {
        const ingredientSummary = this.props.ingredients.map((ingredient) => {
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
                <p><strong>Total Price: {this.props.price}</strong></p>
                <p>Continue to Checkout?</p>
                <Button buttonType={AvailableButtons.danger} clickFuncCB={this.props.purchaseCancelled}>CANCEL</Button>
                <Button buttonType={AvailableButtons.success} clickFuncCB={this.props.purchaseContinued}>CONTINUE</Button>
            </ChildrenContainer>
        );
    }
}

export default OrderSummaryComponent;
