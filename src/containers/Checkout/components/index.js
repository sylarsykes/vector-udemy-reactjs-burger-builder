import React, { Component } from 'react';
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
class Checkout extends Component {

    /**
     * Calculate total price
     */
    calculateTotalPriceHandler = (totalPrice) => Number.parseFloat(totalPrice).toFixed(2)

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
    render = () => {
        let summary = <Redirect to={BURGER_BUILDER_ROUTE} />
        if (this.props.ings) {
            const purchasedRedirect = this.props.purchased ? <Redirect to={BURGER_BUILDER_ROUTE} /> : null;
            summary = (
                <ChildrenContainer>
                    {purchasedRedirect}
                    <CheckoutSummaryFC 
                        ingredients={this.props.ings}
                        totalPrice={this.calculateTotalPriceHandler(this.props.price)} 
                        checkoutCancelled={this.checkoutCancelledHandler}
                        checkoutContinued={this.checkoutContinuedHandler}
                    />
                    <Route
                        path={ CONTACT_DATA_ROUTE }
                        component={ContactData}
                    />
                </ChildrenContainer>
            );
        }

        return summary;
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased,
        price: state.burgerBuilder.totalPrice
    };
}

export default connect(mapStateToProps)(Checkout);