import React, { Component } from 'react';
import { v4 as uuidv4 } from "uuid";

import ChildrenContainer from '../../hoc'
import { AVAILABLE_BURGER_INGREDIENT_INGREDIENTS, CheckoutSummaryFC } from '../../components';

class Checkout extends Component {
    state = {
        // Available ingredients
        ingredients: [
            {
                burgerIngredient: AVAILABLE_BURGER_INGREDIENT_INGREDIENTS.PICKLES,
                count: 0
            },
            {
                burgerIngredient: AVAILABLE_BURGER_INGREDIENT_INGREDIENTS.BACON,
                count: 0
            },
            {
                burgerIngredient: AVAILABLE_BURGER_INGREDIENT_INGREDIENTS.SALAD,
                count: 0
            },
            {
                burgerIngredient: AVAILABLE_BURGER_INGREDIENT_INGREDIENTS.CHEESE,
                count: 0
            },
            {
                burgerIngredient: AVAILABLE_BURGER_INGREDIENT_INGREDIENTS.MEAT,
                count: 0
            }
        ],
    }

    /**
     * @inheritdoc
     */
    componentDidMount = () =>  {
        const query = new URLSearchParams(this.props.location.search);
        const updatedIngredients = this.state.ingredients;

        for (let param of query.entries()) {
            // ['salad', '1']
            const [ type, count ] = param;

            const currentStateIngredient = this._findStateIngredientByType(type);

            if (currentStateIngredient) {
                const oldCount = currentStateIngredient.count;
                const updatedCount = oldCount + parseInt(count);
                const currentStateIngredientIndex = this._findStateIngredientIndexByType(type);

                if (currentStateIngredientIndex !== -1) {
                    updatedIngredients[currentStateIngredientIndex].count = updatedCount;
                }
            }
        }
        this.setState({
            ingredients: updatedIngredients,
        });
    }

    /**
     * Find ingredient by burgerIngredient
     * 
     * @param {*} type Available burger ingredient
     */
    _findStateIngredientByType = (type) => this.state.ingredients.find((ingredient) => ingredient.burgerIngredient.type === type)

    /**
     * Find ingredient index by type
     * 
     * @param {*} type Available burger ingredient 
     */
    _findStateIngredientIndexByType = (type) => this.state.ingredients.findIndex((ingredient) => ingredient.burgerIngredient.type === type)

    checkoutCancelledHandler = () => this.props.history.goBack()

    checkoutContinuedHandler = () => this.props.history.replace('/checkout/contact-data')

    /**
     * @inheritdoc
     */
    render = () => (
        <ChildrenContainer>
            <CheckoutSummaryFC 
                ingredients={this.state.ingredients}
                checkoutCancelled={this.checkoutCancelledHandler}
                checkoutContinued={this.checkoutContinuedHandler}
            />
        </ChildrenContainer>
    )
}

export default Checkout;