import { 
    baseCreateService, ServiceParamsBuilder
} from '../../../../../';

import {
    ORDER_SUMMARY_BASE_URL, OrderModelBuilder
} from '../../';

const ORDER_SUMMARY_CREATE_BASE_URL = ORDER_SUMMARY_BASE_URL + '.json';

/**
 * Create order service
 * 
 * @param {*} body 
 * @param {*} successFuncCB 
 * @param {*} errorFuncCB 
 */
const orderSummaryCreateService = (body, successFuncCB, errorFuncCB) => {
    const orderSummary = new OrderModelBuilder()
        .setDeliveryMethod(body.deliveryMethod)
        .setPrice(body.price)
        .setCustomer(body.customer)
        .setIngredients(body.ingredients)
        .setCreateDate(body.createDate)
        .setCreateUser('admin-user')
        .build();
    
    const serviceParams = new ServiceParamsBuilder()
        .setRequest({
            path: ORDER_SUMMARY_CREATE_BASE_URL,
            body: orderSummary
        })
        .setSuccessFuncCB(successFuncCB)
        .setErrorFuncCB(errorFuncCB)
        .build();

    baseCreateService(serviceParams);
}

export default orderSummaryCreateService;