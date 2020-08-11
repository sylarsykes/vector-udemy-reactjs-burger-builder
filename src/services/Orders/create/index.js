import { call } from 'redux-saga/effects';
import moment from 'moment';
import { ORDERS_BASE_URL, OrdersModel } from '../../../api/Orders';
import { 
    baseCreateService, baseCreateGeneratorFuncService, ServiceParamsBuilder 
} from '../../../services/Common';
import { updateObject } from '../../../utils';

const ORDER_SUMMARY_CREATE_BASE_URL = ORDERS_BASE_URL + '.json';
const ORDERS_SUMMARY_CREATE_SECURE_BASE_URL = ORDER_SUMMARY_CREATE_BASE_URL + '?auth=';

/**
 * Create order service
 * 
 * @param {object} options
 *      Contains the next properties 
 *          - body
 *          - token 
 *          - successFuncCB 
 *          - errorFuncCB 
 */
export const orderSummaryCreateService = (options) => {
    const { body, token, successFuncCB, errorFuncCB } = options;

    const orderSummary = (!body.createDate && !body.createUser) ? OrdersModel.build(updateObject(body, {
            createDate: moment().format('MMMM Do YYYY, h:mm:ss a'),
            createUser: 'admin-user'
        })) : OrdersModel.build(body);
    
    const serviceParams = new ServiceParamsBuilder()
        .setRequest({
            path: (!token) ? ORDER_SUMMARY_CREATE_BASE_URL : ORDERS_SUMMARY_CREATE_SECURE_BASE_URL + token,
            body: orderSummary
        })
        .setSuccessFuncCB(successFuncCB)
        .setErrorFuncCB(errorFuncCB)
        .build();

    baseCreateService(serviceParams);
}

/**
 * Create order with generator function service
 * 
 * @param {object} options
 *      Contains the next properties 
 *          - body
 *          - token 
 *          - successFuncCB* 
 *          - errorFuncCB* 
 */
export const orderSummaryCreateGeneratorFuncService = function* (options) {
    const { body, token, successFuncCB, errorFuncCB } = options;

    const orderSummary = yield (!body.createDate && !body.createUser) ? updateObject(body, {
            createDate: moment().format('MMMM Do YYYY, h:mm:ss a'),
            createUser: 'admin-user'
        }) : body;
    
    const serviceParams = yield new ServiceParamsBuilder()
        .setRequest({
            path: (!token) ? ORDER_SUMMARY_CREATE_BASE_URL : ORDERS_SUMMARY_CREATE_SECURE_BASE_URL + token,
            body: orderSummary
        })
        .setSuccessFuncCB(successFuncCB)
        .setErrorFuncCB(errorFuncCB)
        .build();
    
    yield call(baseCreateGeneratorFuncService, serviceParams);
}