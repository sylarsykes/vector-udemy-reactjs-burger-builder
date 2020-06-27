import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ChildrenContainer, { Layout } from '../../hoc';
import { BurgerBuilder, Checkout, Orders } from '../';
import { 
    BURGER_BUILDER_ROUTE, CHECKOUT_ROUTE, ORDERS_ROUTE 
} from '../routes';

/**
 * Application component
 */
class App extends Component {
    /**
     * @inheritdoc
     */
    render = () => (
        <ChildrenContainer>
            <Layout>
                <BrowserRouter>
                    <Switch>
                        <Route path={ CHECKOUT_ROUTE } component={ Checkout } />
                        <Route path={ ORDERS_ROUTE } component={ Orders } />
                        <Route path={ BURGER_BUILDER_ROUTE } exact component={ BurgerBuilder } />
                    </Switch>
                </BrowserRouter> 
            </Layout>
        </ChildrenContainer>
    );
};

export default App;
