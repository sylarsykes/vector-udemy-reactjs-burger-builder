import { BURGER_BASE_URL } from '../../../constants';
import { BurgerModelBuilder } from '../../../api';
import { baseFindAllService, baseFindByIdService } from '../../../services';
import { FindServiceParamsBuilder } from '../../../utils';

const BURGER_FIND_ALL_PATH = BURGER_BASE_URL + '.json';

/**
 * Find all service
 * 
 * @param {*} successFuncCB 
 *      Success callback to execute
 * @param {*} errorFuncCB
 *      Error callback to execute
 */
const burgerFindAllService = (successFuncCB, errorFuncCB) => {
    // Callback for create new burger ingredient
    const builderModelFuncCB = (id, b) => {
        const burger = new BurgerModelBuilder()
            .setId(id)
            .setName(b.name)
            .setPrice(b.price)
            .setIngredients(b.ingredients)
            .setCreateDate(b.createDate)
            .setCreateUser(b.createUser)
            .build();
        
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
const burgerFindByIdService = (id, successFuncCB, errorFuncCB) => {
    // Callback for create new burger ingredient
    const builderModelFuncCB = (id, b) => {
        const burger = new BurgerModelBuilder()
            .setId(id)
            .setName(b.name)
            .setPrice(b.price)
            .setIngredients(b.ingredients)
            .setCreateDate(b.createDate)
            .setCreateUser(b.createUser)
            .build();

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

export { burgerFindAllService, burgerFindByIdService };