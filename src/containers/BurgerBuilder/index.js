import React, { Component } from 'react';
import { v4 as uuidv4 } from "uuid";
import ChildrenContainer, { ErrorHandler } from '../../hoc';
import { 
    Burger, AVAILABLE_BURGER_INGREDIENT_INGREDIENTS, BURGER_INGREDIENTS_BASE_URL,
    BurgerIngredientModelBuilder, BuildControls, Modal, ORDER_SUMMARY_BASE_URL, 
    OrderSummaryComponent, Spinner
} from '../../components';
import axios, { BASE_URL } from '../../../config/axios';

class BurgerBuilder extends Component {
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
        // Burger price
        totalPrice: 4,
        // Burger is purchasable
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount = () => {
        
        axios.get(BASE_URL + BURGER_INGREDIENTS_BASE_URL)
            .then( response => {
                if (response && response.data) {
                    const data = response.data;
                    const ingredients = [];
                    
                    Object.keys(data).forEach((id) => {
                        const ingredient = data[id];
                        const burgerIngredient = new BurgerIngredientModelBuilder()
                            .setId(id)
                            .setType(ingredient.type)
                            .setLabel(ingredient.label)
                            .setPrice(ingredient.price)
                            .setPosition(ingredient.position)
                            .setCreateDate(ingredient.createDate)
                            .setCreateUser(ingredient.createUser)
                            .build();

                        ingredients.push({
                            burgerIngredient: burgerIngredient,
                            count: 0
                        });
                    }) 

                    this.setState({ 
                        loading: false, 
                        ingredients: ingredients.sort((a, b) => a.burgerIngredient.position > b.burgerIngredient.position) 
                    });
                } else {
                    this.setState({ loading: false })
                }
            })
            .catch(error => {
                this.setState({ loading: false, error: true });
            });
    }

    /**
     * Find ingredient by burgerIngredient
     * 
     * @param {*} burgerIngredient Available burger ingredient
     */
    _findStateIngredientByType = (burgerIngredient) => this.state.ingredients.find((ingredient) => ingredient.burgerIngredient === burgerIngredient)

    /**
     * Find ingredient index by type
     * 
     * @param {*} burgerIngredient Available burger ingredient 
     */
    _findStateIngredientIndexByType = (burgerIngredient) => this.state.ingredients.findIndex((ingredient) => ingredient.burgerIngredient === burgerIngredient)

    /**
     * Update purchase
     * 
     * @param {*} ingredients 
     */
    _updatePurchaseState = (ingredients) => {
        let totalIngredients = 0;
        
        ingredients.forEach((ingredient) => {
            if (ingredient.burgerIngredient && ingredient.count) {
                totalIngredients += ingredient.count;
            }
        });

        this.setState({ purchasable: totalIngredients > 0 });
    }

    /**
     * Added ingredients of burger
     * 
     * @param {*} burgerIngredient Available burger ingredient
     */
    addIngredientHandler = (burgerIngredient) => {
        const currentStateIngredient = this._findStateIngredientByType(burgerIngredient);

        if (currentStateIngredient) {
            const oldCount = currentStateIngredient.count;
            const updatedCount = oldCount + 1;
            const updatedIngredients = this.state.ingredients;

            const currentStateIngredientIndex = this._findStateIngredientIndexByType(burgerIngredient);

            if (currentStateIngredientIndex !== -1) {
                updatedIngredients[currentStateIngredientIndex].count = updatedCount;

                const priceAddition = currentStateIngredient.burgerIngredient.price;
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
     * @param {*} burgerIngredient Available burger ingredient
     */
    removeIngredientHandler = (burgerIngredient) => {
        const currentStateIngredient = this._findStateIngredientByType(burgerIngredient);

        if (currentStateIngredient) {
            const oldCount = currentStateIngredient.count;

            if (oldCount) {
                const updatedCount = oldCount - 1;
                const updatedIngredients = this.state.ingredients;

                const currentStateIngredientIndex = this._findStateIngredientIndexByType(burgerIngredient);
                console.log(currentStateIngredientIndex);
                if (currentStateIngredientIndex !== -1) {
                    updatedIngredients[currentStateIngredientIndex].count = updatedCount;

                    const priceDeduction = currentStateIngredient.burgerIngredient.price;
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
     * @param {*} burgerIngredient Available burger ingredient
     */
    disableBuidControlHandler = (burgerIngredient) => {
        const currentStateIngredient = this._findStateIngredientByType(burgerIngredient);

        if (currentStateIngredient) {
            return currentStateIngredient;
        }

        return null;
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {   
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        this.setState({ loading: true });
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Max Schwarzmüller',
                address: {
                    street: 'Teststreet 1',
                    zipCode: '41351',
                    country: 'Germany'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
        }
        axios.post(ORDER_SUMMARY_BASE_URL, order)
            .then(response => {
                this.setState({ loading: false, purchasing: false });
            })
            .catch(error => {
                this.setState({ loading: false, purchasing: false });
            });
    }

    render = () => {
        let orderSummary = null;
        let burger = this.state.error ? <p> Ingredients can 't be loaded!</p> : <Spinner />;
        
        if (this.state.ingredients) {
            burger = (
                <ChildrenContainer>
                    <Burger key={uuidv4()} ingredients={this.state.ingredients} />
                    <BuildControls
                        price={this.state.totalPrice.toFixed(2)}
                        controls={this.state.ingredients} 
                        purchasable={this.state.purchasable} 
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        ordered={this.purchaseHandler}
                        disableBuildControl={this.disableBuidControlHandler}
                    />
                </ChildrenContainer>
            );
            orderSummary = (
                    <OrderSummaryComponent
                        ingredients={this.state.ingredients}
                        price={this.state.totalPrice.toFixed(2)}
                        purchaseCancelled={this.purchaseCancelHandler}
                        purchaseContinued={this.purchaseContinueHandler} />
            );
        }

        if (this.state.loading) {
            orderSummary = (<Spinner />);
        }
        
        return (
            <ChildrenContainer>
                <Modal 
                    show={this.state.purchasing}
                    modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </ChildrenContainer>
        );
    }
};

export default ErrorHandler(BurgerBuilder, axios);