import React, { Component } from 'react';
import { ContactDataContainer } from '../styles';
import { BURGER_BUILDER_ROUTE } from '../../../../routes';
import { AvailableButtons } from '../../../../../components/constants';
import { orderSummaryCreateService } from '../../../../../components/services';
import { ButtonFC, SpinnerFC } from '../../../../../components/functional-components';


/**
 * Contact data component
 * 
 * Contains a state with properties
 *      - customer CustomerModel object
 *      - loading Show or hide SpinnerFC
 */
class ContactData extends Component {
    state = {
        customer: {
            name: '',
            surname: '',
            email: '',
            address: {
                street: '',
                postalCode: ''
            },
        },
        loading: false
    }

    /**
     * Create order
     * 
     * @param {*} event 
     */
    orderHandler = (event) => {
        event.preventDefault();

        this.setState({ loading: true });
        
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            customer: {
                name: 'Max',
                surname: 'Schwarzmüller',
                address: {
                    street: 'Teststreet 1',
                    zipCode: '41351',
                    country: 'Germany'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
        }

        const self = this;

        const errorFuncCB = (error) => self.setState({ loading: false });

        const successFuncCB = (result) => {
            self.setState({ loading: false });
            self.props.history.push(BURGER_BUILDER_ROUTE);
        }

        orderSummaryCreateService(order, successFuncCB, errorFuncCB);
    }

    render = () => {
        const form = (this.state.loading) ? <SpinnerFC /> :
            <form>
                <input type="text" name="name" placeholder="Your Name" />
                <input type="text" name="name" placeholder="Your Surname" />
                <input type="email" name="email" placeholder="Your Mail" />
                <input type="text" name="street" placeholder="Street" />
                <input type="text" name="postal" placeholder="Postal Code" />
                <ButtonFC 
                    buttonType={AvailableButtons.success} 
                    clickFuncCB={this.orderHandler}>
                        ORDER
                </ButtonFC>  
            </form>;
        
        return (
            <ContactDataContainer>
                <h4>Enter your Contact Data</h4>
                {form}
            </ContactDataContainer>
        );
    }
}

export default ContactData;