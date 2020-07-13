import { 
    orderSummaryFindAllService, orderSummaryFindAllByUserService, orderSummaryCreateService 
} from '../../../components/services';

const PURCHASE_BURGER_START = 'PURCHASE_BURGER_START';
const PURCHASE_BURGER_SUCCESS = 'PURCHASE_BURGER_SUCCESS';
const PURCHASE_BURGER_FAIL = 'PURCHASE_BURGER_FAIL';
const PURCHASE_INIT = 'PURCHASE_INIT';
const FETCH_ORDERS_START = 'FETCH_ORDERS_START';
const FETCH_ORDERS_SUCCESS = 'FETCH_ORDERS_SUCCESS';
const FETCH_ORDERS_FAIL = 'FETCH_ORDERS_FAIL';

/**
 * Create order data success
 * 
 * @param {*} orderData 
 */
const purchaseBurgerSuccess = (orderData) => {
    return {
        type: PURCHASE_BURGER_SUCCESS,
        orderData
    };
};

/**
 * Create order data fail
 *  
 * @param {*} error 
 */
const purchaseBurgerFail = (error) => {
    return {
        type: PURCHASE_BURGER_FAIL,
        error
    };
}

const purchaseBurgerStart = () => {
    return {
        type: PURCHASE_BURGER_START
    };
};

/**
 * Create order data
 * 
 * @param {*} orderData
 * @param {*} token
 */
const purchaseBurger = (orderData, token) => dispatch => {
    dispatch(purchaseBurgerStart());

    const options = {
        body: orderData,
        token,
        successFuncCB: (result) => dispatch(purchaseBurgerSuccess(result)),
        errorFuncCB: (error) => dispatch(purchaseBurgerFail(error))
    };

    orderSummaryCreateService(options);
};

/**
 * Initial purchase action
 */
const purchaseInit = () => {
    return {
        type: PURCHASE_INIT
    };
};

/**
 * Success fetch orders action
 * 
 * @param {*} orders
 *      List of objects of orders 
 */
const fetchOrdersSuccess = (orders) => {
    return {
        type: FETCH_ORDERS_SUCCESS,
        orders
    };
};

/**
 * Error action in fetch orders
 * 
 * @param {*} error
 *      Error 
 */
const fetchOrdersFail = (error) => {
    return {
        type: FETCH_ORDERS_FAIL,
        error
    };
};

const fetchOrdersStart = () => {
    return {
        type: FETCH_ORDERS_START
    };
};

/**
 * Fetch all orders
 */
const fetchOrders = (token, userId) => dispatch => {
    dispatch(fetchOrdersStart());

    if (!token && !userId) {
        orderSummaryFindAllService(
            (results) => {
                if (results && results.length) {
                    const orders = results.sort((a, b) => a.createDate > b.createDate).map((order) => order);

                    dispatch(fetchOrdersSuccess(orders));
                }
            },
            (error) => dispatch(fetchOrdersFail(error))
        );
    } else {
        orderSummaryFindAllByUserService(token, userId,
            (results) => {
                if (results && results.length) {
                    const orders = results.sort((a, b) => a.createDate > b.createDate).map((order) => order);

                    dispatch(fetchOrdersSuccess(orders));
                }
            },
            (error) => dispatch(fetchOrdersFail(error))
        );
    }
    
};

export {
    // CONSTANTS
    PURCHASE_BURGER_START, PURCHASE_BURGER_SUCCESS,
    PURCHASE_BURGER_FAIL, PURCHASE_INIT, FETCH_ORDERS_START,
    FETCH_ORDERS_SUCCESS, FETCH_ORDERS_FAIL,
    // ACTIONS
    purchaseBurgerSuccess, purchaseBurgerFail, purchaseBurgerStart,
    purchaseBurger, purchaseInit, fetchOrdersSuccess, 
    fetchOrdersFail, fetchOrdersStart, fetchOrders
}