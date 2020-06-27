import React, { Component } from 'react';
import { v4 as uuidv4 } from "uuid";
import ChildrenContainer from '../../../../../hoc';
import { AvailableButtons } from '../../../../constants';
import { ButtonFC } from '../../../../functional-components';

/**
 * Order summary component
 */
class OrderSummaryComponent extends Component {

    componentWillUpdate = () => console.log('[Order Summary] Will Update');

    /**
     * @inheritdoc
     */
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
                <ButtonFC buttonType={AvailableButtons.danger} clickFuncCB={this.props.purchaseCancelled}>CANCEL</ButtonFC>
                <ButtonFC buttonType={AvailableButtons.success} clickFuncCB={this.props.purchaseContinued}>CONTINUE</ButtonFC>
            </ChildrenContainer>
        );
    }
}

export default OrderSummaryComponent;
