import React from 'react';
import { 
    createStore, 
    applyMiddleware, 
    compose, 
    combineReducers 
} from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { burgerBuilderReducer, ordersReducer } from '../reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    burgerBuilder: burgerBuilderReducer,
    order: ordersReducer
});

const useBurgerBuilderStore = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));

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

