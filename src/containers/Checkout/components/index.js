import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { CONTACT_DATA_ROUTE } from '../../routes';
import { AVAILABLE_BURGER_INGREDIENT_INGREDIENTS } from '../../../components/constants';
import { burgerIngredientFindAllService } from '../../../components/services';
import ChildrenContainer from '../../../hoc';
import { CheckoutSummaryFC } from '../../../components/functional-components';
import { ContactData } from '../';

/**
 * Checkout component
 * 
 * Contains state with properties:
 *      - ingredients: List of burgerIngredients and a count of ingredient
 */
class Checkout extends Component {
    state = {
        queryParams: null,
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
        totalPrice: 0,
        loading: false,
    }

    /**
     * Calculate total price
     */
    calculateTotalPriceHandler = (totalPrice) => Number.parseFloat(totalPrice).toFixed(2)

    componentWillMount = () => {
        const queryParams = new URLSearchParams(this.props.location.search);
        
        this.setState({ queryParams: queryParams });
    }

    /**
     * @inheritdoc
     */
    componentDidMount = () => {
        const self = this;

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
                    ingredients: ingredients
                }); 

                const updatedIngredients = self.state.ingredients;
                let totalPrice = 0;
                const queryParams = self.state.queryParams;
                
                for (let param of queryParams.entries()) {
                    // ['salad', '1']
                    const [type, count] = param;

                    if (type !== 'totalPrice') {
                        const currentStateIngredient = self._findStateIngredientByType(type);

                        if (currentStateIngredient) {
                            const oldCount = currentStateIngredient.count;
                            const updatedCount = oldCount + parseInt(count);
                            const currentStateIngredientIndex = self._findStateIngredientIndexByType(type);

                            if (currentStateIngredientIndex !== -1) {
                                updatedIngredients[currentStateIngredientIndex].count = updatedCount;
                            }
                        } 
                    } else {
                        totalPrice = self.calculateTotalPriceHandler(count);
                    }
                }
                
                self.setState({
                    ingredients: updatedIngredients,
                    totalPrice: totalPrice,
                    loading: false,
                });
            }
        };

        // Error callback
        const errorFuncCB = (results) => self.setState({ loading: false, error: true });

        this.setState({ loading: true });

        burgerIngredientFindAllService(successFuncCB, errorFuncCB);
    }

    /**
     * Find ingredient by burgerIngredient type
     * 
     * @param {string} type 
     *      burgerIngredient type
     */
    _findStateIngredientByType = (type) => 
        this.state.ingredients.find((ingredient) => ingredient.burgerIngredient.type === type)

    /**
     * Find ingredient index by burgerIngredient type
     * 
     * @param {string} type 
     *      burgerIngredient type 
     */
    _findStateIngredientIndexByType = (type) => 
        this.state.ingredients.findIndex((ingredient) => ingredient.burgerIngredient.type === type)

    /**
     * Execute history back
     */
    checkoutCancelledHandler = () => this.props.history.goBack()

    /**
     * Redirect to contact data view
     */
    checkoutContinuedHandler = () => this.props.history.replace(CONTACT_DATA_ROUTE)

    /**
     * @inheritdoc
     */
    render = () => (
        <ChildrenContainer>
            <CheckoutSummaryFC 
                ingredients={this.state.ingredients}
                totalPrice={this.calculateTotalPriceHandler(this.state.totalPrice)} 
                checkoutCancelled={this.checkoutCancelledHandler}
                checkoutContinued={this.checkoutContinuedHandler}
            />
            <Route
                path={ CONTACT_DATA_ROUTE }
                render={(props) => 
                    (<ContactData 
                        ingredients={this.state.ingredients} 
                        totalPrice={this.calculateTotalPriceHandler(this.state.totalPrice)} 
                        {...props} 
                    />)} 
            />
        </ChildrenContainer>
    )
}

export default Checkout;