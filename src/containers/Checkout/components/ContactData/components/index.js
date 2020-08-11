import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { isEmpty, map, sortBy } from 'lodash';
import { ContactDataContainer } from '../styles';
import { 
    AvailableButtons, AvailableInputs, AvailableInputInputTypes 
} from '../../../../../components/constants';
import { ErrorHandler } from '../../../../../hoc';
import axios from '../../../../../../config/axios';
import { AvailableSituationsOrders, AvailableDeliveryMethodOrders } from '../../../../../api/Orders';
import { ButtonFC, InputFC, SpinnerFC } from '../../../../../components/functional-components';
import { CountriesSelect } from '../../../../../components/Countries';
import { purchaseBurger } from '../../../../../actions';
import { updateObject, checkValidity } from '../../../../../utils';

/**
 * Contact data component
 * 
 * Contains a state with properties
 *      - customer CustomerModel object
 *      - loading Show or hide SpinnerFC
 */
const ContactData = (props) => {
    const { onOrderBurger, ings, price, authenticatedUser, loading, countries } = props;
    const { t, i18n } = useTranslation('contactData');

    let optionsSelectCountries = (!isEmpty(countries)) ? sortBy(map(countries, (country) => {
        const { language } = i18n;

        return {
            value: country.code,
            displayValue: (language 
                && country.existsTranslatedNameFromTranslationsByCountryCode(language)) ? 
                    country.getTranslatedNameFromTranslationsByCountryCode(language) : country.name
        }
    }), [(option) => option.displayValue]) : [];

    const orderFormInitialState = {
        name: {
            elementType: AvailableInputs.input,
            elementConfig: {
                type: AvailableInputInputTypes.text,
                placeholder: t('contactData.form.name.placeholder')
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false,
            errorMessage: t('contactData.form.name.errorMesssage')
        },
        surname: {
            elementType: AvailableInputs.input,
            elementConfig: {
                type: AvailableInputInputTypes.text,
                placeholder: t('contactData.form.surname.placeholder')
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
                placeholder: t('contactData.form.email.placeholder')
            },
            value: '',
            validation: {
                required: true,
                isEmail: true
            },
            valid: false,
            touched: false,
            errorMessage: t('contactData.form.email.errorMessage')
        },
        street: {
            elementType: AvailableInputs.input,
            elementConfig: {
                type: AvailableInputInputTypes.text,
                placeholder: t('contactData.form.street.placeholder')
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false,
            errorMessage: t('contactData.form.street.errorMessage')
        },
        city: {
            elementType: AvailableInputs.input,
            elementConfig: {
                type: AvailableInputInputTypes.text,
                placeholder: 'City'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false,
            errorMessage: t('contactData.form.street.errorMessage')
        },
        state: {
            elementType: AvailableInputs.input,
            elementConfig: {
                type: AvailableInputInputTypes.text,
                placeholder: 'State'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false,
            errorMessage: t('contactData.form.street.errorMessage')
        },
        postalCode: {
            elementType: AvailableInputs.input,
            elementConfig: {
                type: AvailableInputInputTypes.text,
                placeholder: t('contactData.form.zipCode.placeholder')
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
            errorMessage: t('contactData.form.zipCode.errorMessage')
        },
        /*country: {
            elementType: AvailableInputs.select,
            elementConfig: {
                options: optionsSelectCountries
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false,
            errorMessage: t('contactData.form.country.errorMessage')
        },*/
        deliveryMethod: {
            elementType: AvailableInputs.select,
            elementConfig: {
                options: [{
                        value: AvailableDeliveryMethodOrders.FASTEST,
                        displayValue: t('contactData.form.deliveryMethod.fastest')
                    },
                    {
                        value: AvailableDeliveryMethodOrders.CHEAPEST,
                        displayValue: t('contactData.form.deliveryMethod.cheapest')
                    }
                ]
            },
            value: AvailableDeliveryMethodOrders.FASTEST,
            validation: {},
            valid: true
        }
    }

    const [orderForm, setOrderForm] = useState(orderFormInitialState);

    const [formIsValid, setFormIsValid] = useState(false);
    
    /**
     * Get formData value
     */
    const getFormData = () => {
        const formData = {};

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
    const orderHandler = (event) => {
        event.preventDefault();

        const formData = getFormData();

        // Create order
        const order = {
            situation: AvailableSituationsOrders.RECEIVED,
            deliveryMethod: formData.deliveryMethod,
            ingredients: ings,
            subtotalPrice: price,
            deliveryFee: 1.99,
            totalPrice: price + 1.99,
            customer: {
                name: formData.name,
                surname: formData.surname,
                email: formData.email,
                address: {
                    street: formData.street,
                    city: formData.city,
                    state: formData.state,
                    postalCode: formData.zipCode,
                    country: formData.country
                },
            },
            customerUserId: authenticatedUser.userUID
        }

        onOrderBurger(order, authenticatedUser.token);
    }

    /**
     * Change handler
     * 
     * @param {*} event 
     * @param {*} inputIdentifier 
     */
    const inputChangedHandler = (event, inputIdentifier) => {
        const updatedFormElement = updateObject(orderForm[inputIdentifier], {
            value: event.target.value,
            valid: checkValidity(event.target.value, orderForm[inputIdentifier].validation),
            touched: true
        });
        const updatedOrderForm = updateObject(orderForm, {
            [inputIdentifier]: updatedFormElement
        });
        
        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }

        setOrderForm(updatedOrderForm);
        setFormIsValid(formIsValid);
    }

    const formElementsArray = [];

    for (let key in orderForm) {
        formElementsArray.push({
            id: key,
            config: orderForm[key]
        });
    }

    const form = (loading) ? <SpinnerFC /> :
        <form onSubmit={orderHandler }>
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
                    changed={(event) => inputChangedHandler(event, formElement.id)} />
            ))}

            <CountriesSelect />
            <ButtonFC 
                buttonType={AvailableButtons.success} 
                disabled={!formIsValid}>
                    {t('contactData.order')} 
            </ButtonFC>  
        </form>;
    
    return (
        <ContactDataContainer>
            <h4>{t('contactData.title')}</h4> 
            {form}
        </ContactDataContainer>
    );
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        authenticatedUser: state.auth.authenticatedUser,
        countries: state.country.countries
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData, token) => dispatch(purchaseBurger(orderData, token))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler(ContactData, axios));