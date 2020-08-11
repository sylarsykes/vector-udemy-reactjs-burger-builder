import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from "uuid";
import { find, isFunction} from 'lodash';
import { Translation } from "react-i18next";
import { CHECKOUT_ROUTE, AUTH_ROUTE } from '../../routes';
import ChildrenContainer, { ErrorHandler } from '../../../hoc';
import { 
    BurgerFC, BuildControlsFC, SpinnerFC
} from '../../../components/functional-components';
import { ModalComponent, OrderSummaryComponent } from '../../../components/components';
import axios from '../../../../config/axios';
import { 
    addIngredient, removeIngredient, initIngridients,
    purchaseInit, setAuthRedirectPath
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
const BurgerBuilder = (props) => {

    const { history } = props;

    const [purchasing, setPurchasing] = useState(false);

    const dispatch = useDispatch();

    const ings = useSelector(state => state.burgerBuilder.ingredients);
    const price = useSelector(state => state.burgerBuilder.totalPrice);
    const error = useSelector(state => state.burgerBuilder.error);
    const isAuthenticated = useSelector(state => {
        const { authenticatedUser } = state.auth;
        const validate = authenticatedUser !== null 
            && isFunction(authenticatedUser.isAuthenticated)
            && authenticatedUser.isAuthenticated();
        return validate;
    });

    const onIngredientAdded = (burgerIngredient) => dispatch(addIngredient(burgerIngredient));
    const onIngredientRemoved = (burgerIngredient) => dispatch(removeIngredient(burgerIngredient));
    const onInitIngredients = useCallback(
        () => dispatch(initIngridients()),
        [dispatch]
    );
    const onInitPurchase = () => dispatch(purchaseInit());
    const onSetAuthRedirectPath = (path) => dispatch(setAuthRedirectPath(path));

    /**
     * @inheritdoc
     * 
     * Fetch burger ingredients 
     */
    useEffect(() => {
        onInitIngredients();
    }, [onInitIngredients]);

    /**
     * Update purchase
     * 
     * @param {*} ingredients 
     */
    const updatePurchaseState = (ingredients) => {
        let totalIngredients = 0;
        
        ingredients.forEach((ingredient) => {
            if (ingredient.burgerIngredient && ingredient.count) {
                totalIngredients += ingredient.count;
            }
        });

        return totalIngredients > 0;
    };

    /**
     * Disable build control
     * 
     * @param {*} burgerIngredient Available burger ingredient
     */
    const disableBuildControlHandler = (burgerIngredient) => {
        const currentStateIngredient = find(ings, (ingredient) => ingredient.burgerIngredient === burgerIngredient);

        if (currentStateIngredient) {
            return currentStateIngredient;
        }

        return null;
    }

    /**
     * Enable purchasing
     */
    const purchaseHandler = () => {
        if (isAuthenticated) {
            setPurchasing(true);
        } else {
            onSetAuthRedirectPath(CHECKOUT_ROUTE);
            history.push(AUTH_ROUTE);
        }
    };

    /**
     * Disable purchasing
     */
    const purchaseCancelHandler = () => setPurchasing(false);

    /**
     * Create query params with ingredients selected for create order 
     */
    const purchaseContinueHandler = () => {
        onInitPurchase();
        history.push(CHECKOUT_ROUTE);
    }

    let orderSummary = null;

    let burger = error ? (<Translation>
                {
                    (t, { i18next }) => (<p>{t('burgerBuilder:burgerBuilder.error')}</p>) 
                }
            </Translation>) : (<SpinnerFC />);

    if (ings) {
        burger = (
            <ChildrenContainer>
                <BurgerFC key={uuidv4()} ingredients={ings} />
                <BuildControlsFC
                    price={price}
                    controls={ings} 
                    purchasable={updatePurchaseState(ings)} 
                    ingredientAdded={onIngredientAdded}
                    ingredientRemoved={onIngredientRemoved}
                    ordered={purchaseHandler}
                    disableBuildControl={disableBuildControlHandler}
                />
            </ChildrenContainer>
        );
        orderSummary = (
                <OrderSummaryComponent
                    ingredients={ings}
                    price={price}
                    purchaseCancelled={purchaseCancelHandler}
                    purchaseContinued={purchaseContinueHandler} />
        );
    }

    return (
        <ChildrenContainer>
            <ModalComponent 
                show={purchasing}
                modalClosed={purchaseCancelHandler}>
                {orderSummary}
            </ModalComponent>
            {burger}
        </ChildrenContainer>
    );
};

export default ErrorHandler(BurgerBuilder, axios);
