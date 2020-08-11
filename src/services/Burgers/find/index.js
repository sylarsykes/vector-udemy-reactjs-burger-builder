import { BURGER_BASE_URL, BurgersModel } from '../../../api';
import { 
    baseFindAllService, baseFindByIdService, FindServiceParamsBuilder 
} from '../../Common';

const BURGER_FIND_ALL_PATH = BURGER_BASE_URL + '.json';

/**
 * Find all service
 * 
 * @param {*} successFuncCB 
 *      Success callback to execute
 * @param {*} errorFuncCB
 *      Error callback to execute
 */
export const burgerFindAllService = (successFuncCB, errorFuncCB) => {
    // Callback for create new burger ingredient
    const builderModelFuncCB = (id, body) => {
        const burger = BurgersModel.build({
            id,
            ...body
        });
        
        return burger;
    }

    const serviceParams = new FindServiceParamsBuilder()
        .setRequest({
            path: BURGER_FIND_ALL_PATH
        })
        .setBuilderModelFuncCB(builderModelFuncCB)
        .setSuccessFuncCB(successFuncCB)
        .setErrorFuncCB(errorFuncCB)
        .build();

    baseFindAllService(serviceParams);
};

/* eslint-disable no-template-curly-in-string */
// eslint-disable-next-line no-eval
const BURGER_FIND_BY_ID_PATH = (id) => eval('`' + BURGER_BASE_URL + '/${id}`');

/**
 * Find by id service
 * 
 * @param {*} id 
 * @param {*} successFuncCB 
 * @param {*} errorFuncCB 
 */
export const burgerFindByIdService = (id, successFuncCB, errorFuncCB) => {
    // Callback for create new burger ingredient
    const builderModelFuncCB = (id, body) => {
        const burger = BurgersModel.build({
            id,
            ...body
        });
        
        return burger;
    } 

    const serviceParams = new FindServiceParamsBuilder()
        .setParams({
            id: id
        })
        .setRequest({
            path: BURGER_FIND_BY_ID_PATH(id),
        })
        .setBuilderModelFuncCB(builderModelFuncCB)
        .setSuccessFuncCB(successFuncCB)
        .setErrorFuncCB(errorFuncCB)
        .build();

    baseFindByIdService(serviceParams);
}