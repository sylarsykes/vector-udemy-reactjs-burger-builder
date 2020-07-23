import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from "uuid";
import ChildrenContainer, { ErrorHandler } from '../../../hoc';
import { OrderFC, SpinnerFC } from '../../../components/functional-components';
import axios from '../../../../config/axios';
import { fetchOrders } from '../../../actions'

/**
 * Orders component
 * 
 * Contains state with properties:
 *      - orders: List of orders
 *      - loading: Show or hide SpinnerFC
 */
const Orders = (props) => {
    const { onFetchOrders, loading, orders, token, userId } = props;

    // Get user orders
    useEffect(() => {
        onFetchOrders(token, userId);
    }, [
        onFetchOrders,
        token,
        userId
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
        token: state.auth.token,
        userId: state.auth.userId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token, userId) => dispatch(fetchOrders(token, userId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler(Orders, axios));

