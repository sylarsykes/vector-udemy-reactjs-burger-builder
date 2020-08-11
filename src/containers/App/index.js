import React, { useEffect } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { isFunction } from 'lodash';
import {
    BURGER_BUILDER_ROUTE, CHECKOUT_ROUTE, ORDERS_ROUTE,
    AUTH_ROUTE, LOGOUT_ROUTE
} from '../routes';
import ChildrenContainer, { Layout } from '../../hoc';
import { BurgerBuilder, Logout} from '../';
import { authCheckState } from '../../actions';

const AsyncAuthComponent = React.lazy(() => {
    return import('../Auth/components'); 
});

const AsyncCheckoutComponent = React.lazy(() => {
    return import('../Checkout/components');
});

const AsyncOrdersComponent = React.lazy(() => {
    return import('../Orders/components');
});

/**
 * Application component
 */
const App = (props) => {
    const { onTryAutoSignup, isAuthenticated } = props;

    useEffect(() => {
        onTryAutoSignup();
    }, [onTryAutoSignup]);

    let routes = (
        <Switch>
            <Route path={ AUTH_ROUTE } component={AsyncAuthComponent} />
            <Route path={ BURGER_BUILDER_ROUTE } exact component={BurgerBuilder} />
            <Redirect to={ BURGER_BUILDER_ROUTE } />
        </Switch> 
    );

    if (isAuthenticated ) {
        routes = (
            <Switch>
                <Route path={CHECKOUT_ROUTE} component={AsyncCheckoutComponent} />
                <Route path={ORDERS_ROUTE} component={AsyncOrdersComponent} />
                <Route path={LOGOUT_ROUTE} component={Logout} />
                <Route path={ AUTH_ROUTE } component={AsyncAuthComponent} />
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

};

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.authenticatedUser !== null
            && isFunction(state.auth.authenticatedUser.isAuthenticated) 
            && state.auth.authenticatedUser.isAuthenticated()
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignup: () => dispatch(authCheckState())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
