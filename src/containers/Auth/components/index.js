import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { isFunction } from 'lodash';
import { BURGER_BUILDER_ROUTE } from '../../routes';
import { auth, setAuthRedirectPath } from '../../../actions';
import { AvailableButtons } from '../../../components/constants';
import { 
    InputFC, ButtonFC, SpinnerFC  
} from '../../../components/functional-components';
import { updateObject, checkValidity } from '../../../components/utils';

const AuthContainer = styled.div`
    margin: 20px auto;
    width: 80%;
    text-align: center;
    box-shadow: 0 2px 3px #ccc;
    border: 1px solid #eee;
    padding: 10px;
    box-sizing: border-box;

    @media (min-width: 600px) {
        width: 500px;
    }
`;

const Auth = (props) => {

    const [authForm, setAuthForm] = useState({
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Mail Address'
            },
            value: '',
            validation: {
                required: true,
                isEmail: true
            },
            valid: false,
            touched: false
        },
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Password'
            },
            value: '',
            validation: {
                required: true,
                minLength: 6
            },
            valid: false,
            touched: false
        }
    });

    const [isSignup, setIsSignup] = useState(true);

    const { buildingBurger, authRedirectPath, onSetAuthRedirectPath } = props;

    useEffect(() => {
        if (!buildingBurger && authRedirectPath !== BURGER_BUILDER_ROUTE) {
            onSetAuthRedirectPath();
        }
    }, [buildingBurger, authRedirectPath, onSetAuthRedirectPath]);


    /**
     * Input change handler
     * 
     * @param {*} event 
     * @param {*} controlName 
     */
    const inputChangedHandler = (event, controlName) => {
        const updatedControls = updateObject(authForm, {
            [controlName]: updateObject(authForm[controlName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, authForm[controlName].validation),
                touched: true
            })
        });
        setAuthForm(updatedControls);
    };

    /**
     * Submit form
     *  
     * @param {object} event 
     */
    const submitHandler = (event) => {
        event.preventDefault();
        props.onAuth(authForm.email.value, authForm.password.value, isSignup);
    };

    /**
     * Switch auth model
     */
    const switchAuthModeHandler = () => setIsSignup(!isSignup);

    const formElementsArray = [];
    for (let key in authForm) {
        formElementsArray.push({
            id: key,
            config: authForm[key]
        });
    }

    let form = formElementsArray.map( formElement => (
        <InputFC
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={(event) => inputChangedHandler(event, formElement.id)} />
    ));

    if (props.loading) {
        form = <SpinnerFC />
    }

    let errorMessage = null;

    if (props.error) {
        errorMessage = (
            <p>{props.error.message}</p>
        );
    }

    let authRedirect = null;
    if (props.isAuthenticated) {
        authRedirect = <Redirect to={props.authRedirectPath}/>
    }

    return (
        <AuthContainer>
            {authRedirect}
            {errorMessage}
            <form onSubmit={submitHandler}>
                {form}
                <ButtonFC btnType={AvailableButtons.success}>SUBMIT</ButtonFC>
            </form>
            <ButtonFC 
                clickFuncCB={switchAuthModeHandler}
                btnType={AvailableButtons.danger}>SWITCH TO {isSignup ? 'SIGNIN' : 'SIGNUP'}</ButtonFC>
        </AuthContainer>
    );
};

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.authenticatedUser !== null
            && isFunction(state.auth.authenticatedUser.isAuthenticated) 
            && state.auth.authenticatedUser.isAuthenticated(),
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(auth(email, password, isSignup)),
        onSetAuthRedirectPath: () => dispatch(setAuthRedirectPath(BURGER_BUILDER_ROUTE))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);

