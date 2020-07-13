import { ORDER_SUMMARY_BASE_URL } from '../../constants';
import { OrderModelBuilder } from '../../api';
import { baseCreateService, ServiceParamsBuilder } from '../../../../../Common';
import moment from 'moment';

const ORDER_SUMMARY_CREATE_BASE_URL = ORDER_SUMMARY_BASE_URL + '.json';
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

    const orderSummary = new OrderModelBuilder()
        .setDeliveryMethod(body.deliveryMethod)
        .setPrice(body.price)
        .setUserId(body.userId)
        .setCustomer(body.customer)
        .setIngredients(body.ingredients)
        .setCreateDate(moment().format('MMMM Do YYYY, h:mm:ss a'))
        .setCreateUser('admin-user')
        .build();
    
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