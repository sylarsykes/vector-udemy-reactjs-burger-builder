import React, { Component } from 'react';

export const AsyncComponent = (importComponent) => {
    return class extends Component {
        state = {
            component: null
        }

        /**
         * @inheritdoc
         */
        componentDidMount = () =>
            importComponent()
                .then(cmp => this.setState({component: cmp.default}));
        
        /**
         * @inheritdoc
         */
        render = () => {
            const C = this.state.component;

            return C ? <C {...this.props} /> : null;
        }
    }
}