import React, { Component } from 'react';
import { connect } from 'react-redux';
import i18next from 'i18next';
import { Translation } from "react-i18next";
import { ContactDataContainer } from '../styles';
import { 
    AvailableButtons, AvailableInputs, AvailableInputInputTypes 
} from '../../../../../components/constants';
import { ButtonFC, InputFC, SpinnerFC } from '../../../../../components/functional-components';
import { purchaseBurger } from '../../../../../actions';
import { updateObject, checkValidity } from '../../../../../components/utils';

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
                    type: AvailableInputInputTypes.text,
                    placeholder: i18next.t('contactData:contactData.form.name.placeholder')
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                errorMessage: i18next.t('contactData:contactData.form.name.errorMesssage')
            },
            surname: {
                elementType: AvailableInputs.input,
                elementConfig: {
                    type: AvailableInputInputTypes.text,
                    placeholder: i18next.t('contactData:contactData.form.surname.placeholder')
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
                    type: AvailableInputInputTypes.email,
                    placeholder: i18next.t('contactData:contactData.form.email.placeholder')
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false,
                errorMessage: i18next.t('contactData:contactData.form.email.errorMessage')
            },
            street: {
                elementType: AvailableInputs.input,
                elementConfig: {
                    type: AvailableInputInputTypes.text,
                    placeholder: i18next.t('contactData:contactData.form.street.placeholder')
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                errorMessage: i18next.t('contactData:contactData.form.street.errorMessage')
            },
            zipCode: {
                elementType: AvailableInputs.input,
                elementConfig: {
                    type: AvailableInputInputTypes.text,
                    placeholder: i18next.t('contactData:contactData.form.zipCode.placeholder')
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5,
                    isNumeric: true
                },
                valid: false,
                touched: false,
                errorMessage: i18next.t('contactData:contactData.form.zipCode.errorMessage')
            },
            country: {
                elementType: AvailableInputs.input,
                elementConfig: {
                    type: AvailableInputInputTypes.text,
                    placeholder: i18next.t('contactData:contactData.form.country.placeholder')
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                errorMessage: i18next.t('contactData:contactData.form.country.errorMessage')
            },
            deliveryMethod: {
                elementType: AvailableInputs.select,
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: i18next.t('contactData:contactData.form.deliveryMethod.fastest')},
                        {value: 'cheapest', displayValue: i18next.t('contactData:contactData.form.deliveryMethod.cheapest')}
                    ]
                },
                value: 'fastest',
                validation: {},
                valid: true
            }
        },
        formIsValid: false
    }   
    
    /**
     * Get formData value
     */
    getFormData = () => {
        const formData = {};
        const orderForm = this.state.orderForm;

        for (let formElementIdentifier in orderForm) {
            formData[formElementIdentifier] = orderForm[formElementIdentifier].value;
        }

        return formData;
    }

    /**
     * Create order
     * 
     * @param {*} event 
     */
    orderHandler = (event) => {
        event.preventDefault();

        const formData = this.getFormData();
        
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
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
            deliveryMethod: formData.deliveryMethod,
            userId: this.props.userId
        }

        this.props.onOrderBurger(order, this.props.token);
    }

    /**
     * Change handler
     * 
     * @param {*} event 
     * @param {*} inputIdentifier 
     */
    inputChangedHandler = (event, inputIdentifier) => {
        const updatedFormElement = updateObject(this.state.orderForm[inputIdentifier], {
            value: event.target.value,
            valid: checkValidity(event.target.value, this.state.orderForm[inputIdentifier].validation),
            touched: true
        });
        const updatedOrderForm = updateObject(this.state.orderForm, {
            [inputIdentifier]: updatedFormElement
        });
        
        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
    }

    /**
     * @inheritdoc
     */
    render = () => {
        const formElementsArray = [];
        const orderForm = this.state.orderForm;

        for (let key in orderForm) {
            formElementsArray.push({
                id: key,
                config: orderForm[key]
            });
        }

        const form = (this.props.loading) ? <SpinnerFC /> :
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
                        errorMessage={formElement.config.errorMessage}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                ))}
                <ButtonFC 
                    buttonType={AvailableButtons.success} 
                    disabled={!this.state.formIsValid}>
                        <Translation>
                            {
                                (t, { i18next }) => t('contactData:contactData.order') 
                            }
                        </Translation>  
                </ButtonFC>  
            </form>;
        
        return (
            <ContactDataContainer>
                <Translation>
                    {
                        (t, { i18next }) => <h4>{t('contactData:contactData.title')}</h4> 
                    }
                </Translation> 
                {form}
            </ContactDataContainer>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData, token) => dispatch(purchaseBurger(orderData, token))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactData);