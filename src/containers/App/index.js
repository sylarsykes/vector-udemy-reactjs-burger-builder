import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {
    BURGER_BUILDER_ROUTE, CHECKOUT_ROUTE, ORDERS_ROUTE,
    AUTH_ROUTE, LOGOUT_ROUTE
} from '../routes';
import ChildrenContainer, { Layout } from '../../hoc';
import {
    Auth, Logout, BurgerBuilder, 
    Checkout, Orders 
} from '../';
import { authCheckState } from '../../actions';

/**
 * Application component
 */
class App extends Component {
    /**
     * @inheritdoc
     */
    componentDidMount = () => this.props.onTryAutoSignup();

    /**
     * @inheritdoc
     */
    render = () => {
        let routes = (
            <Switch>
                <Route path={ AUTH_ROUTE } component={Auth} />
                <Route path={ BURGER_BUILDER_ROUTE } exact component={BurgerBuilder} />
                <Redirect to={ BURGER_BUILDER_ROUTE } />
            </Switch> 
        );

        if ( this.props.isAuthenticated ) {
            routes = (
                <Switch>
                    <Route path={CHECKOUT_ROUTE} component={Checkout} />
                    <Route path={ORDERS_ROUTE} component={Orders} />
                    <Route path={LOGOUT_ROUTE} component={Logout} />
                    <Route path={BURGER_BUILDER_ROUTE} exact component={BurgerBuilder} />
                    <Redirect to={BURGER_BUILDER_ROUTE} />
                </Switch>  
            );
        }

        return (
            <ChildrenContainer>
                <Layout>
                    {routes} 
                </Layout>
            </ChildrenContainer>
        );
    }
};

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignup: () => dispatch(authCheckState())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
