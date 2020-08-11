import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import { Route, Redirect } from 'react-router-dom';
import axios from '../../../../config/axios';
import { CONTACT_DATA_ROUTE, BURGER_BUILDER_ROUTE } from '../../routes';
import ChildrenContainer, { ErrorHandler } from '../../../hoc';
import { CheckoutSummaryFC } from '../../../components/functional-components';
import { ContactData } from '../';
import { fetchCountries } from '../../../actions/components/Countries';

/**
 * Checkout component
 * 
 * Contains state with properties:
 *      - ingredients: List of burgerIngredients and a count of ingredient
 */
const Checkout = (props) => {
    
    const { onFetchCountries, history, ings, price, purchased, countries } = props;

    /*useEffect(() => {
        if (isEmpty(countries)) {
            onFetchCountries();
        }
    }, [
        onFetchCountries,
        countries
    ]);*/

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
        price: state.burgerBuilder.totalPrice,
        loading: state.country.loading,
        countries: state.country.countries
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchCountries: () => dispatch(fetchCountries())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler(Checkout, axios));