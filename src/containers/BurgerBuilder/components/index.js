import React, { Component } from 'react';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from "uuid";
import { CHECKOUT_ROUTE } from '../../routes';
import { AVAILABLE_BURGER_INGREDIENT_INGREDIENTS } from '../../../components/constants';
import { burgerIngredientFindAllService } from '../../../components/services';
import ChildrenContainer, { ErrorHandler } from '../../../hoc';
import { 
    BurgerFC, BuildControlsFC, SpinnerFC
} from '../../../components/functional-components';
import { ModalComponent, OrderSummaryComponent } from '../../../components/components';
import axios from '../../../../config/axios';
import { ADD_INGREDIENT, REMOVE_INGREDIENT } from '../../../actions';

/**
 * Burger builder component
 * 
 * Contains state with properties:
 *      - ingredients: List of burgerIngredients and a count of ingredient
 *      - totalPrice: Price of burger
 *      - purchasable: Enable or disable functional components
 *      - loading: Enable or disable SpinnerFC
 *      - error: Show or hide error messages
 */
class BurgerBuilder extends Component {
    state = {
        locale: 'en',
        // Available ingredients
        ingredients: [
            {
                burgerIngredient: AVAILABLE_BURGER_INGREDIENT_INGREDIENTS.PICKLES,
                //count: 0
            },
            {
                burgerIngredient: AVAILABLE_BURGER_INGREDIENT_INGREDIENTS.BACON,
                //count: 0
            },
            {
                burgerIngredient: AVAILABLE_BURGER_INGREDIENT_INGREDIENTS.SALAD,
                //count: 0
            },
            {
                burgerIngredient: AVAILABLE_BURGER_INGREDIENT_INGREDIENTS.CHEESE,
                //count: 0
            },
            {
                burgerIngredient: AVAILABLE_BURGER_INGREDIENT_INGREDIENTS.MEAT,
                //count: 0
            }
        ],
        // Burger price
        //totalPrice: 4,
        // Burger is purchasable
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    /**
     * @inheritdoc
     */
    componentDidMount = () => {
        const self = this;

        /*
        // Success callback
        const successFuncCB = (results) => {
            if (results && results.length) {
                const ingredients = [];
                
                results.sort((a, b) => a.position > b.position)
                    .forEach((burgerIngredient) => {
                        ingredients.push({
                            burgerIngredient: burgerIngredient,
                            count: 0
                        }); 
                    }
                );

                self.setState({
                    loading: false,
                    ingredients: ingredients,
                    error: false
                }); 
            }
        };

        // Error callback
        const errorFuncCB = (results) => self.setState({ loading: false, error: true });

        this.setState({ loading: true });

        burgerIngredientFindAllService(successFuncCB, errorFuncCB);
        */
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

    /**
     * Calculate total price
     */
    calculateTotalPriceHandler = () => Number.parseFloat(this.props.price).toFixed(2)

    /**
     * Enable purchasing
     */
    purchaseHandler = () => this.setState({purchasing: true});

    /**
     * Disable purchasing
     */
    purchaseCancelHandler = () => this.setState({purchasing: false});

    /**
     * Create query params with ingredients selected for create order 
     */
    purchaseContinueHandler = () => {
        // Create query params
        const queryParams = [];
        for (let i in this.state.ingredients) {
            const ingredient = this.state.ingredients[i];

            if (ingredient && ingredient.count) {
                queryParams.push(
                    encodeURIComponent(ingredient.burgerIngredient.type) 
                        + '=' + encodeURIComponent(ingredient.count)
                );
            }
        }
        queryParams.push('totalPrice=' + this.calculateTotalPriceHandler());
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: CHECKOUT_ROUTE,
            search: '?' + queryString
        });

    }

    /**
     * @inheritdoc
     */
    render = () => {
        let orderSummary = null;

        let burger = this.state.error ? <p> Ingredients can 't be loaded!</p> : <SpinnerFC />;
        
        if (this.state.ingredients) {
            burger = (
                <ChildrenContainer>
                    <BurgerFC key={uuidv4()} ingredients={this.props.ings} />
                    <BuildControlsFC
                        price={this.calculateTotalPriceHandler()}
                        controls={this.props.ings} 
                        purchasable={this.state.purchasable} 
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        ordered={this.purchaseHandler}
                        disableBuildControl={this.disableBuidControlHandler}
                    />
                </ChildrenContainer>
            );
            orderSummary = (
                    <OrderSummaryComponent
                        ingredients={this.props.ings}
                        price={this.calculateTotalPriceHandler()}
                        purchaseCancelled={this.purchaseCancelHandler}
                        purchaseContinued={this.purchaseContinueHandler} />
            );
        }

        if (this.state.loading) {
            orderSummary = (<SpinnerFC />);
        }
        
        return (
            <ChildrenContainer>
                <ModalComponent 
                    show={this.state.purchasing}
                    modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </ModalComponent>
                {burger}
            </ChildrenContainer>
        );
    }
};

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (burgerIngredient) => dispatch({type: ADD_INGREDIENT, burgerIngredient}),
        onIngredientRemoved: (burgerIngredient) => dispatch({type: REMOVE_INGREDIENT, burgerIngredient})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler(BurgerBuilder, axios));
