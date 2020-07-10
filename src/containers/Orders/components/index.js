import React, { Component } from 'react';
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
class Orders extends Component {
    /*state = {
        orders: [],
        loading: false
    }*/

    /**
     * @inheritdoc
     */
    componentDidMount = () => this.props.onFetchOrders();

    /**
     * @inheritdoc
     */
    render = () => {
        let orders = <SpinnerFC />;

        if (!this.props.loading) {
            orders = this.props.orders.map(order => (
                <OrderFC 
                    key={uuidv4()}
                    ingredients={order.ingredients}
                    price={order.price} />
            )); 
        } 
        return ( 
            <ChildrenContainer>
                <div>
                    {orders}
                </div>
            </ChildrenContainer>
        );
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: () => dispatch(fetchOrders())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler(Orders, axios));

