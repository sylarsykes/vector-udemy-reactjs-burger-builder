import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from "uuid";
import ChildrenContainer, { ErrorHandler } from '../../../hoc';
import { OrderFC, SpinnerFC } from '../../../components/functional-components';
import axios from '../../../../config/axios';
import { fetchOrders } from '../../../actions/containers/Orders';

/**
 * Orders component
 * 
 * Contains state with properties:
 *      - orders: List of orders
 *      - loading: Show or hide SpinnerFC
 */
const Orders = (props) => {
    const { onFetchOrders, loading, orders, authenticatedUser } = props;

    // Get user orders
    useEffect(() => {
        onFetchOrders(authenticatedUser);
    }, [
        onFetchOrders,
        authenticatedUser
    ]);

    const ordersOutput = (!loading) ? orders.map(order => (
            <OrderFC 
                key={uuidv4()}
                ingredients={order.ingredients}
                price={order.price} />
        )) : (<SpinnerFC />);

    return ( 
        <ChildrenContainer>
            <div>
                {ordersOutput}
            </div>
        </ChildrenContainer>
    );
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        authenticatedUser: state.auth.authenticatedUser
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (authenticatedUser) => dispatch(fetchOrders(authenticatedUser))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler(Orders, axios));

