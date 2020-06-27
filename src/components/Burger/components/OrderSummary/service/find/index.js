import { ORDER_SUMMARY_BASE_URL } from '../../constants';
import { OrderModelBuilder } from '../../api';
import { baseFindAllService, baseFindByIdService, FindServiceParamsBuilder } from '../../../../../Common';


const ORDER_SUMMARY_FIND_ALL_PATH = ORDER_SUMMARY_BASE_URL + '.json';

/**
 * Find all service
 * 
 * @param {*} successFuncCB 
 *      Success callback to execute
 * @param {*} errorFuncCB
 *      Error callback to execute
 */
const orderSummaryFindAllService = (successFuncCB, errorFuncCB) => {
    // Callback for create new burger ingredient
    const builderModelFuncCB = (id, orderSummary) => {
        const order = new OrderModelBuilder()
            .setId(id)
            .setPrice(orderSummary.price)
            .setDeliveryMethod(orderSummary.deliveryMethod)
            .setCustomer(orderSummary.customer)
            .setIngredients(orderSummary.ingredients)
            .setCreateDate(orderSummary.createDate)
            .setCreateUser(orderSummary.createUser)
            .setUpdateDate(orderSummary.updateDate)
            .setUpdateUser(orderSummary.updateUser)
            .build();
        
        return order;
    }
    
    const serviceParams = new FindServiceParamsBuilder()
        .setRequest({
            path: ORDER_SUMMARY_FIND_ALL_PATH,
        })
        .setBuilderModelFuncCB(builderModelFuncCB)
        .setSuccessFuncCB(successFuncCB)
        .setErrorFuncCB(errorFuncCB)
        .build();

    baseFindAllService(serviceParams);
};

/* eslint-disable no-template-curly-in-string */
// eslint-disable-next-line no-eval
const ORDER_SUMMARY_FIND_BY_ID_PATH = (id) => eval('`' + ORDER_SUMMARY_BASE_URL + '/${id}`');

const orderSummaryFindByIdService = (id, successFuncCB, errorFuncCB) => {
    // Callback for create new order summary
    const builderModelFuncCB = (id, orderSummary) => {
        const order = new OrderModelBuilder()
            .setId(id)
            .setPrice(orderSummary.price)
            .setDeliveryMethod(orderSummary.deliveryMethod)
            .setCustomer(orderSummary.customer)
            .setIngredients(orderSummary.ingredients)
            .setCreateDate(orderSummary.createDate)
            .setCreateUser(orderSummary.createUser)
            .setUpdateDate(orderSummary.updateDate)
            .setUpdateUser(orderSummary.updateUser)
            .build();

        return order;
    }

    const serviceParams = new FindServiceParamsBuilder()
        .setParams({
            id: id
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

export { orderSummaryFindAllService, orderSummaryFindByIdService };