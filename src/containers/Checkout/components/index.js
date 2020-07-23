import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { CONTACT_DATA_ROUTE, BURGER_BUILDER_ROUTE } from '../../routes';
import ChildrenContainer from '../../../hoc';
import { CheckoutSummaryFC } from '../../../components/functional-components';
import { ContactData } from '../';

/**
 * Checkout component
 * 
 * Contains state with properties:
 *      - ingredients: List of burgerIngredients and a count of ingredient
 */
const Checkout = (props) => {
    const { history, ings, price, purchased } = props;

    // Execute history back
    const checkoutCancelledHandler = () => history.goBack();

    // Redirect to contact data view
    const checkoutContinuedHandler = () => history.replace(CONTACT_DATA_ROUTE);

    const purchasedRedirect = purchased ? (<Redirect to={BURGER_BUILDER_ROUTE} />) : null;
    const summary = (ings) ? (
            <ChildrenContainer>
                {purchasedRedirect}
                <CheckoutSummaryFC 
                    ingredients={ings}
                    totalPrice={price} 
                    checkoutCancelled={checkoutCancelledHandler}
                    checkoutContinued={checkoutContinuedHandler}
                />
                <Route
                    path={ CONTACT_DATA_ROUTE }
                    component={ContactData}
                />
            </ChildrenContainer>
        )  : (<Redirect to={BURGER_BUILDER_ROUTE} />);

    return summary;
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased,
        price: state.burgerBuilder.totalPrice
    };
}

export default connect(mapStateToProps)(Checkout);