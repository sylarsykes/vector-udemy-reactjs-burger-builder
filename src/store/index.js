import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer, { initialState } from '../reducers';

const useBurgerBuilderStore = createStore(reducer, initialState);

/**
 * Custom Store Provider
 * 
 * @param {*} props 
 */
const BurgerBuilderReactReduxProvider = (props) => (
    <Provider 
        store={useBurgerBuilderStore}
    >
        {props.children}
    </Provider>
);

export default BurgerBuilderReactReduxProvider;
export { 
    useBurgerBuilderStore
};

