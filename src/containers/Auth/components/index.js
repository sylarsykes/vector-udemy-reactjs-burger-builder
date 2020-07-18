import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
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

class Auth extends Component {
    state = {
        controls: {
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
        },
        isSignup: true
    }

    /**
     * @inheritdoc
     */
    componentDidMount = () => {
        if (!this.props.buildingBurger && this.props.authRedirectPath !== BURGER_BUILDER_ROUTE) {
            this.props.onSetAuthRedirectPath();
        }
    }

    /**
     * Input change handler
     * 
     * @param {*} event 
     * @param {*} controlName 
     */
    inputChangedHandler = (event, controlName) => {
        const updatedControls = updateObject(this.state.controls, {
            [controlName]: updateObject(this.state.controls[controlName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            })
        });
        this.setState({
            controls: updatedControls
        });
    }

    /**
     * Submit form
     *  
     * @param {object} event 
     */
    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
    }

    /**
     * Switch auth model
     */
    switchAuthModeHandler = () => this.setState(prevState => {
        return {
            isSignup: !prevState.isSignup
        };
    });

    /**
     * @inheritdoc
     */
    render = () => {
        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
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
                changed={(event) => this.inputChangedHandler(event, formElement.id)} />
        ));

        if (this.props.loading) {
            form = <SpinnerFC />
        }

        let errorMessage = null;

        if (this.props.error) {
            errorMessage = (
                <p>{this.props.error.message}</p>
            );
        }

        let authRedirect = null;
        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to={this.props.authRedirectPath}/>
        }

        return (
            <AuthContainer>
                {authRedirect}
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <ButtonFC btnType={AvailableButtons.success}>SUBMIT</ButtonFC>
                </form>
                <ButtonFC 
                    clickFuncCB={this.switchAuthModeHandler}
                    btnType={AvailableButtons.danger}>SWITCH TO {this.state.isSignup ? 'SIGNIN' : 'SIGNUP'}</ButtonFC>
            </AuthContainer>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
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

