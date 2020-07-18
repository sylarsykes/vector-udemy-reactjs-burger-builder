import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {
    BURGER_BUILDER_ROUTE, CHECKOUT_ROUTE, ORDERS_ROUTE,
    AUTH_ROUTE, LOGOUT_ROUTE
} from '../routes';
import ChildrenContainer, { Layout, AsyncComponent} from '../../hoc';
import { BurgerBuilder } from '../';
import { authCheckState } from '../../actions';

const AsyncAuthComponent = AsyncComponent(() => { 
    return import('../Auth'); 
});

const AsyncLogoutComponent = AsyncComponent(() => {
    return import('../Auth/components/Logout');
});

const AsyncCheckoutComponent = AsyncComponent(() => {
    return import('../Checkout');
});

const AsyncOrdersComponent = AsyncComponent(() => {
    return import('../Orders');
});

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
                <Route path={ AUTH_ROUTE } component={AsyncAuthComponent} />
                <Route path={ BURGER_BUILDER_ROUTE } exact component={BurgerBuilder} />
                <Redirect to={ BURGER_BUILDER_ROUTE } />
            </Switch> 
        );

        if ( this.props.isAuthenticated ) {
            routes = (
                <Switch>
                    <Route path={CHECKOUT_ROUTE} component={AsyncCheckoutComponent} />
                    <Route path={ORDERS_ROUTE} component={AsyncOrdersComponent} />
                    <Route path={LOGOUT_ROUTE} component={AsyncLogoutComponent} />
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
