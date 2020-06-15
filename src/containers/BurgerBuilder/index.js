import React, { Component } from 'react';

import { ChildrenContainer } from '../../hoc';
import { Burger, AVAILABLE_BURGER_INGREDIENT_INGREDIENTS, BuildControls,
        Modal, OrderSummary } from '../../components';

export default class BurgerBuilder extends Component {
    state = {
        // Available ingredients
        ingredients: [
            {
                type: AVAILABLE_BURGER_INGREDIENT_INGREDIENTS.PICKLES,
                count: 0
            },
            {
                type: AVAILABLE_BURGER_INGREDIENT_INGREDIENTS.BACON,
                count: 0
            },
            {
                type: AVAILABLE_BURGER_INGREDIENT_INGREDIENTS.SALAD,
                count: 0
            },
            {
                type: AVAILABLE_BURGER_INGREDIENT_INGREDIENTS.CHEESE,
                count: 0
            },
            {
                type: AVAILABLE_BURGER_INGREDIENT_INGREDIENTS.MEAT,
                count: 0
            }
        ],
        // Burger price
        totalPrice: 4,
        // Burger is purchasable
        purchasable: false,
        purchasing: false
    }

    /**
     * Find ingredient by type
     * 
     * @param {*} type Available burger ingredient
     */
    _findStateIngredientByType = (type) => this.state.ingredients.find((ingredient) => ingredient.type === type)

    /**
     * Find ingredient index by type
     * 
     * @param {*} type Available burger ingredient 
     */
    _findStateIngredientIndexByType = (type) => this.state.ingredients.findIndex((ingredient) => ingredient.type === type)

    /**
     * Update purchase
     * 
     * @param {*} ingredients 
     */
    _updatePurchaseState = (ingredients) => {
        let totalIngredients = 0;
        
        ingredients.forEach((ingredient) => {
            if (ingredient.type && ingredient.count) {
                totalIngredients += ingredient.count;
            }
        });

        this.setState({ purchasable: totalIngredients > 0 });
    }

    /**
     * Added ingredients of burger
     * 
     * @param {*} type Available burger ingredient
     */
    addIngredientHandler = (type) => {
        const currentStateIngredient = this._findStateIngredientByType(type);

        if (currentStateIngredient) {
            const oldCount = currentStateIngredient.count;
            const updatedCount = oldCount + 1;
            const updatedIngredients = this.state.ingredients;

            const currentStateIngredientIndex = this._findStateIngredientIndexByType(type);

            if (currentStateIngredientIndex !== -1) {
                updatedIngredients[currentStateIngredientIndex].count = updatedCount;

                const priceAddition = currentStateIngredient.type.price;
                const oldTotalPrice = this.state.totalPrice;
                const updatedToltalPrice = oldTotalPrice + priceAddition;
                const updatedState = {
                    ingredients: updatedIngredients,
                    totalPrice: updatedToltalPrice
                };

                this.setState(updatedState);
                this._updatePurchaseState(updatedIngredients);
            }
        }
    } 

    /**
     * Delete ingredients of burger
     * 
     * @param {*} type Available burger ingredient
     */
    removeIngredientHandler = (type) => {
        const currentStateIngredient = this._findStateIngredientByType(type);

        if (currentStateIngredient) {
            const oldCount = currentStateIngredient.count;

            if (oldCount) {
                const updatedCount = oldCount - 1;
                const updatedIngredients = this.state.ingredients;

                const currentStateIngredientIndex = this._findStateIngredientIndexByType(type);

                if (currentStateIngredientIndex !== -1) {
                    updatedIngredients[currentStateIngredientIndex].count = updatedCount;

                    const priceDeduction = currentStateIngredient.type.price;
                    const oldTotalPrice = this.state.totalPrice;
                    const updatedToltalPrice = oldTotalPrice - priceDeduction;
                    const updatedState = {
                        ingredients: updatedIngredients,
                        totalPrice: updatedToltalPrice
                    };

                    this.setState(updatedState);
                    this._updatePurchaseState(updatedIngredients);
                }
            }
        }
    }

    /**
     * Disable build control
     * 
     * @param {*} type Available burger ingredient
     */
    disableBuidControlHandler = (type) => {
        const currentStateIngredient = this._findStateIngredientByType(type);

        if (currentStateIngredient) {
            return currentStateIngredient;
        }

        return null;
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        console.log('Cancel');

        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        alert('You continue!');
    }
    
    render = () => (
        <ChildrenContainer>
            <Modal 
                show={this.state.purchasing}
                modalClosed={this.purchaseCancelHandler}>
                <OrderSummary
                    ingredients={this.state.ingredients}
                    purchaseCancelled={this.purchaseCancelHandler}
                    purchaseContinued={this.purchaseContinueHandler} />
            </Modal>
            <Burger ingredients={this.state.ingredients} />
            <BuildControls
                price={this.state.totalPrice}
                purchasable={this.state.purchasable} 
                ingredientAdded={this.addIngredientHandler}
                ingredientRemoved={this.removeIngredientHandler}
                ordered={this.purchaseHandler}
                disableBuildControl={this.disableBuidControlHandler}
            />
        </ChildrenContainer>
    );
};