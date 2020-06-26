import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import ChildrenContainer, { Layout } from '../../hoc';
import { BurgerBuilder, Checkout } from '../';

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
                        <Route path="/checkout" component={ Checkout } />
                        <Route path="/" component={ BurgerBuilder } />
                    </Switch>
                </BrowserRouter> 
            </Layout>
        </ChildrenContainer>
    );
};

export default App;
