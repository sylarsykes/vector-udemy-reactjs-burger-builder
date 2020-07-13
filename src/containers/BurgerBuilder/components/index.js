import React, { Component } from 'react';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from "uuid";
import { Translation } from "react-i18next";
import { CHECKOUT_ROUTE } from '../../routes';
import ChildrenContainer, { ErrorHandler } from '../../../hoc';
import { 
    BurgerFC, BuildControlsFC, SpinnerFC
} from '../../../components/functional-components';
import { ModalComponent, OrderSummaryComponent } from '../../../components/components';
import axios from '../../../../config/axios';
import { 
    addIngredient, removeIngredient, initIngridients,
    purchaseInit, calculateTotalPrice
} from '../../../actions';

/*
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
        // ingredients: [],
        // Burger price
        //totalPrice: 4,
        // Burger is purchasable
        //purchasable: false,
        purchasing: false,
    }

    /**
     * @inheritdoc
     * 
     * Fetch burger ingredients 
     */
    componentDidMount = () => this.props.onInitIngredients();

    /**
     * Find ingredient by burgerIngredient
     * 
     * @param {*} burgerIngredient Available burger ingredient
     */
    _findStateIngredientByType = (burgerIngredient) => this.props.ings.find((ingredient) => ingredient.burgerIngredient === burgerIngredient)

    /**
     * Update purchase
     * 
     * @param {*} ingredients 
     */
    updatePurchaseState = (ingredients) => {
        let totalIngredients = 0;
        
        ingredients.forEach((ingredient) => {
            if (ingredient.burgerIngredient && ingredient.count) {
                totalIngredients += ingredient.count;
            }
        });

        return totalIngredients > 0;
    }

    /**
     * Disable build control
     * 
     * @param {*} burgerIngredient Available burger ingredient
     */
    disableBuildControlHandler = (burgerIngredient) => {
        const currentStateIngredient = this._findStateIngredientByType(burgerIngredient);

        if (currentStateIngredient) {
            return currentStateIngredient;
        }

        return null;
    }

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
        this.props.onInitPurchase();
        this.props.history.push(CHECKOUT_ROUTE);
    }

    /**
     * @inheritdoc
     */
    render = () => {
        let orderSummary = null;

        let burger = this.props.error ? <Translation>
                    {
                        (t, { i18next }) => <p>{t('burgerBuilder:burgerBuilder.error')}</p> 
                    }
                </Translation> : <SpinnerFC />;

        if (this.props.ings) {
            burger = (
                <ChildrenContainer>
                    <BurgerFC key={uuidv4()} ingredients={this.props.ings} />
                    <BuildControlsFC
                        price={this.props.price}
                        controls={this.props.ings} 
                        purchasable={this.updatePurchaseState(this.props.ings)} 
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        ordered={this.purchaseHandler}
                        disableBuildControl={this.disableBuildControlHandler}
                    />
                </ChildrenContainer>
            );
            orderSummary = (
                    <OrderSummaryComponent
                        ingredients={this.props.ings}
                        price={this.props.price}
                        purchaseCancelled={this.purchaseCancelHandler}
                        purchaseContinued={this.purchaseContinueHandler} />
            );
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
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (burgerIngredient) => dispatch(addIngredient(burgerIngredient)),
        onIngredientRemoved: (burgerIngredient) => dispatch(removeIngredient(burgerIngredient)),
        onInitIngredients: () => dispatch(initIngridients()),
        onInitPurchase: () => dispatch(purchaseInit()),
        onCalculateTotalPrice: (price, digit) => dispatch(calculateTotalPrice({ price, digit }))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler(BurgerBuilder, axios));
