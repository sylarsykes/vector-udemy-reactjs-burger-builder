import React from 'react';
import { 
    createStore, 
    applyMiddleware, 
    compose, 
    combineReducers 
} from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from "redux-saga";
import { 
    authReducer, burgerBuilderReducer, ordersReducer, countriesReducer 
} from '../reducers';
import { 
    watchAuth, watchBurgerBuilder, watchOrder, watchCountries 
} from '../sagas';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    auth: authReducer,
    burgerBuilder: burgerBuilderReducer,
    order: ordersReducer,
    country: countriesReducer
});

const sagaMiddleware = createSagaMiddleware();
const useBurgerBuilderStore = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk, sagaMiddleware)
));

sagaMiddleware.run(watchAuth);
sagaMiddleware.run(watchBurgerBuilder);
sagaMiddleware.run(watchOrder);
sagaMiddleware.run(watchCountries);

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

