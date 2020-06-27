import React, { Component } from 'react';
import { v4 as uuidv4 } from "uuid";
import ChildrenContainer, { ErrorHandler } from '../../../hoc';
import { OrderFC } from '../../../components/functional-components';
import axios from '../../../../config/axios';
import { orderSummaryFindAllService } from '../../../components/services';

/**
 * Orders component
 * 
 * Contains state with properties:
 *      - orders: List of orders
 *      - loading: Show or hide SpinnerFC
 */
class Orders extends Component {
    state = {
        orders: [],
        loading: false
    }

    /**
     * @inheritdoc
     */
    componentDidMount = () => {
        const self = this;

        // Success callback
        const successFuncCB = (results) => {
            if (results && results.length) {
                const orders = results.sort((a, b) => a.createDate > b.createDate)
                        .map((order) => order);

                self.setState({
                    loading: false,
                    orders: orders,
                    error: false
                }); 
            }
        };

        // Error callback
        const errorFuncCB = (results) => self.setState({ loading: false, error: true });

        this.setState({ loading: true });
        
        orderSummaryFindAllService(successFuncCB, errorFuncCB);
    }

    /**
     * @inheritdoc
     */
    render = () => (
        <ChildrenContainer>
            {this.state.orders.map(order => (
                    <OrderFC 
                        key={uuidv4()}
                        ingredients={order.ingredients}
                        price={order.price} />
                ))}
        </ChildrenContainer>
    )
}

export default ErrorHandler(Orders, axios);

