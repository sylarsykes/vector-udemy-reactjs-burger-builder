import { 
    PURCHASE_INIT, PURCHASE_BURGER_START, PURCHASE_BURGER_SUCCESS,
    PURCHASE_BURGER_FAIL, FETCH_ORDERS_START, FETCH_ORDERS_FAIL,
    FETCH_ORDERS_SUCCESS 
} from '../../../actions';
import { updateObject } from '../../../components/utils';

const initialState = {
    orders: [],
    loading: false,
    purchased: false
};

/**
 * Initial purchase state
 *  
 * @param {*} state
 *      Object with state purchase 
 * @param {*} action
 *      Object with action and parameters 
 */
const purchaseInit = (state, action) => updateObject(state, { purchased: false });

/**
 * Purchase burger start
 *  
 * @param {*} state
 *      Object with state purchase 
 * @param {*} action
 *      Object with action and parameters 
 */
const purchaseBurgerStart = (state, action) => updateObject(state, { loading: false });

/**
 * Purchase burger success
 * 
 * @param {*} state 
 * @param {*} action 
 */
const purchaseBurgerSuccess = (state, action) => updateObject(state, {
    loading: false,
    purchased: true,
    orders: action.orders
});

/**
 *  Purchase burger fail
 *  
  * @param {*} state
 *      Object with state purchase 
 * @param {*} action
 *      Object with action and parameters
 */
const purchaseBurgerFail = (state, action) => purchaseBurgerStart(state, action);

/**
 * Fetch orders start
 *  
 * @param {*} state 
 * @param {*} action 
 */
const fetchOrdersStart = (state, action) => updateObject(state, {loading: true });

/**
 * Fetch orders success
 *  
 * @param {*} state 
 * @param {*} action 
 */
const fetchOrdersSuccess = (state, action) => updateObject(state, {
    orders: action.orders,
    loading: false
});

/**
 * Fetch orders fail
 *  
 * @param {*} state 
 * @param {*} action 
 */
const fetchOrdersFail = (state, action) => updateObject(state, { loading: false });

/**
 * Orders reducer
 *  
 * @param {*} state 
 * @param {*} action 
 */
export const ordersReducer = (state = initialState, action) => {
    switch ( action.type ) {
        case PURCHASE_INIT: 
            return purchaseInit(state, action);
        case PURCHASE_BURGER_START: 
            return purchaseBurgerStart(state, action);
        case PURCHASE_BURGER_SUCCESS: 
            return purchaseBurgerSuccess(state, action)
        case PURCHASE_BURGER_FAIL: 
            return purchaseBurgerFail(state, action);
        case FETCH_ORDERS_START: 
            return fetchOrdersStart(state, action);
        case FETCH_ORDERS_SUCCESS: 
            return fetchOrdersSuccess(state, action);
        case FETCH_ORDERS_FAIL: 
            return fetchOrdersFail(state, action);
        default: 
            return state;
    }
};