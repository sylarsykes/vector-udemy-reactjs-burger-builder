import React, { Component } from 'react';

import { Layout } from '../../components';
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
