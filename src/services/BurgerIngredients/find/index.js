import { call } from 'redux-saga/effects';
import { BURGER_INGREDIENTS_BASE_URL, BurgerIngredientsModel } from '../../../api';
import { 
    baseFindAllService, baseFindAllGeneratorFuncService, baseFindByIdService, 
    FindServiceParamsBuilder 
} from '../../Common';

const BURGER_INGREDIENT_FIND_ALL_PATH = BURGER_INGREDIENTS_BASE_URL + '.json';

/**
 * Find all service
 * 
 * @param {*} successFuncCB 
 *      Success callback to execute
 * @param {*} errorFuncCB
 *      Error callback to execute
 * @param {*} config
 *      Config axios object
 */
export const burgerIngredientFindAllService = (successFuncCB, errorFuncCB, config) => {
    // Callback for create new burger ingredient
    const builderModelFuncCB = (id, ingredient) => {
        const burgerIngredient = BurgerIngredientsModel.build({
            id,
            ...ingredient
        });
        
        return burgerIngredient;
    }

    const serviceParams = new FindServiceParamsBuilder()
        .setRequest({
            path: BURGER_INGREDIENT_FIND_ALL_PATH,
            config: config
        })
        .setBuilderModelFuncCB(builderModelFuncCB)
        .setSuccessFuncCB(successFuncCB)
        .setErrorFuncCB(errorFuncCB)
        .build();

    baseFindAllService(serviceParams);
};

export const burgerIngredientFindAllGeneratorFuncService = function* (options) {
    const { config, successFuncCB, errorFuncCB } = options;

    // Callback for create new burger ingredient
    const builderModelFuncCB = (id, ingredient) => {
        const burgerIngredient = BurgerIngredientsModel.build({
            id,
            ...ingredient
        });

        return burgerIngredient;
    }

    const serviceParams = yield new FindServiceParamsBuilder()
        .setRequest({
            path: BURGER_INGREDIENT_FIND_ALL_PATH,
            config: config
        })
        .setBuilderModelFuncCB(builderModelFuncCB)
        .setSuccessFuncCB(successFuncCB)
        .setErrorFuncCB(errorFuncCB)
        .build();
    
    yield call(baseFindAllGeneratorFuncService, serviceParams);
}

/* eslint-disable no-template-curly-in-string */
// eslint-disable-next-line no-eval
const BURGER_INGREDIENT_FIND_BY_ID_PATH = (id) => eval('`' + BURGER_INGREDIENTS_BASE_URL + '/${id}`');

/**
 * Find by id service
 * 
 * @param {*} id 
 * @param {*} successFuncCB 
 * @param {*} errorFuncCB 
 */
export const burgerIngredientFindByIdService = (id, successFuncCB, errorFuncCB) => {
    // Callback for create new burger ingredient
    const builderModelFuncCB = (id, ingredient) => {
        const burgerIngredient = BurgerIngredientsModel.build({
            id,
            ...ingredient
        });

        return burgerIngredient;
    }

    const serviceParams = new FindServiceParamsBuilder()
        .setParams({
            id: id
        })
        .setRequest({
            path: BURGER_INGREDIENT_FIND_BY_ID_PATH(id),
        })
        .setBuilderModelFuncCB(builderModelFuncCB)
        .setSuccessFuncCB(successFuncCB)
        .setErrorFuncCB(errorFuncCB)
        .build();

    baseFindByIdService(serviceParams);
}