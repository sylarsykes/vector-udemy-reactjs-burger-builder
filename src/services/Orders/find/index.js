import { call } from 'redux-saga/effects';
import { ORDERS_BASE_URL, OrdersModel } from '../../../api/Orders';
import { 
    baseFindAllService, baseFindAllGeneratorFuncService, baseFindByIdService, 
    FindServiceParamsBuilder 
} from '../../Common';

const ORDER_SUMMARY_FIND_ALL_PATH = ORDERS_BASE_URL + '.json';
const ORDER_SUMMARY_FIND_ALL_SECURE_PATH = ORDER_SUMMARY_FIND_ALL_PATH + '?auth=';

/**
 * Find all service
 * 
 * @param {object} options
 *      Properties
 *          -   authenticatedUser
 *          -   successFuncCB
 *          -   errorFuncCB
 */
export const orderSummaryFindAllService = (options) => {
    const { authenticatedUser, successFuncCB, errorFuncCB } = options;
    // Callback for create new order
    const builderModelFuncCB = (id, orderSummary) => OrdersModel.build({
        id,
        ...orderSummary
    });

    const path = (authenticatedUser && authenticatedUser.token && authenticatedUser.userUID) ? 
        ORDER_SUMMARY_FIND_ALL_SECURE_PATH 
            + authenticatedUser.token 
            + '&orderBy="userId"&equalTo="' 
            + authenticatedUser.userUID + '"':
        ORDER_SUMMARY_FIND_ALL_PATH;
    
    const serviceParams = new FindServiceParamsBuilder()
        .setRequest({
            path,
        })
        .setBuilderModelFuncCB(builderModelFuncCB)
        .setSuccessFuncCB(successFuncCB)
        .setErrorFuncCB(errorFuncCB)
        .build();

    baseFindAllService(serviceParams);
};

/**
 * Find all with generator function service
 * 
 * @param {object} options
 *      Properties
 *          -   authenticatedUser
 *          -   successFuncCB
 *          -   errorFuncCB
 */
export const orderSummaryFindAllGeneratorFuncService = function* (options) {
    const { authenticatedUser, successFuncCB, errorFuncCB } = options;

    // Callback for create new order
    const builderModelFuncCB = (id, orderSummary) => OrdersModel.build({
        id,
        ...orderSummary
    });

    const path = (authenticatedUser && authenticatedUser.token && authenticatedUser.userUID) ?
        ORDER_SUMMARY_FIND_ALL_SECURE_PATH 
            + authenticatedUser.token 
            + '&orderBy="userId"&equalTo="' 
            + authenticatedUser.userUID + '"':
        ORDER_SUMMARY_FIND_ALL_PATH;
    
    const serviceParams = yield new FindServiceParamsBuilder()
        .setRequest({
            path,
        })
        .setBuilderModelFuncCB(builderModelFuncCB)
        .setSuccessFuncCB(successFuncCB)
        .setErrorFuncCB(errorFuncCB)
        .build();
    
    yield call(baseFindAllGeneratorFuncService, serviceParams);
}

/* eslint-disable no-template-curly-in-string */
// eslint-disable-next-line no-eval
const ORDER_SUMMARY_FIND_BY_ID_PATH = (id) => eval('`' + ORDERS_BASE_URL + '/${id}`');

/**
 * Find by id service
 * 
 * @param {object} options
 *      Properties
 *          -   id
 *          -   successFuncCB
 *          -   errorFuncCB
 */
export const orderSummaryFindByIdService = (options) => {
    const { id, successFuncCB, errorFuncCB } = options;

    // Callback for create new order summary
    const builderModelFuncCB = (id, orderSummary) => OrdersModel.build({
        id,
        ...orderSummary
    });

    const serviceParams = new FindServiceParamsBuilder()
        .setParams({
            id
        })
        .setRequest({
            path: ORDER_SUMMARY_FIND_BY_ID_PATH(id),
        })
        .setBuilderModelFuncCB(builderModelFuncCB)
        .setSuccessFuncCB(successFuncCB)
        .setErrorFuncCB(errorFuncCB)
        .build();

    baseFindByIdService(serviceParams);
}