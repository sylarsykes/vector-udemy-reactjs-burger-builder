import React, { Component } from 'react';
import { ContactDataContainer } from '../styles';
import { BURGER_BUILDER_ROUTE } from '../../../../routes';
import { AvailableButtons, AvailableInputs } from '../../../../../components/constants';
import { orderSummaryCreateService } from '../../../../../components/services';
import { ButtonFC, InputFC, SpinnerFC } from '../../../../../components/functional-components';


/**
 * Contact data component
 * 
 * Contains a state with properties
 *      - customer CustomerModel object
 *      - loading Show or hide SpinnerFC
 */
class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: AvailableInputs.input,
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            surname: {
                elementType: AvailableInputs.input,
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Surname'
                },
                value: '',
                validation: {
                    required: false
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: AvailableInputs.input,
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: AvailableInputs.input,
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: AvailableInputs.input,
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5,
                    isNumeric: true
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: AvailableInputs.input,
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: AvailableInputs.select,
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: 'fastest',
                validation: {},
                valid: true
            }
        },
        formIsValid: false,
        loading: false
    }

    checkValidity = (value, rules) => {
        let isValid = true;
        if (!rules) {
            return true;
        }
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    /**
     * Create order
     * 
     * @param {*} event 
     */
    orderHandler = (event) => {
        event.preventDefault();

        this.setState({ loading: true });
        
        const formData = {};
        const orderForm = this.state.orderForm;

        for (let formElementIdentifier in orderForm) {
            formData[formElementIdentifier] = orderForm[formElementIdentifier].value;
        }
        
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            customer: {
                name: formData.name,
                surname: formData.surname,
                email: formData.email,
                address: {
                    street: formData.street,
                    zipCode: formData.zipCode,
                    country: formData.country
                },
            },
            deliveryMethod: formData.deliveryMethod
        }

        const self = this;

        const errorFuncCB = (error) => self.setState({ loading: false });

        const successFuncCB = (result) => {
            self.setState({ loading: false });
            self.props.history.push(BURGER_BUILDER_ROUTE);
        }

        orderSummaryCreateService(order, successFuncCB, errorFuncCB);
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElement = { 
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        
        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
    }

    render = () => {
        const formElementsArray = [];
        const orderForm = this.state.orderForm;

        for (let key in orderForm) {
            formElementsArray.push({
                id: key,
                config: orderForm[key]
            });
        }

        const form = (this.state.loading) ? <SpinnerFC /> :
            <form onSubmit={this.orderHandler }>
                {formElementsArray.map(formElement => (
                    <InputFC 
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                ))}
                <ButtonFC 
                    buttonType={AvailableButtons.success} 
                    disabled={!this.state.formIsValid}>
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