import React, { Component } from 'react';

import { Layout } from '../../hoc';
import { BurgerBuilder} from '../';

class App extends Component {

    render = () => (
        <div>
            <Layout>
                <BurgerBuilder />
            </Layout>
        </div>
    );
};

export default App;
