import { call } from 'redux-saga/effects';
import { BURGER_INGREDIENTS_BASE_URL } from '../../constants';
import { BurgerIngredientModelBuilder } from '../../api';
import { 
    baseFindAllService, baseFindAllGeneratorFuncService, baseFindByIdService, 
    FindServiceParamsBuilder 
} from '../../../../../Common';

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
const burgerIngredientFindAllService = (successFuncCB, errorFuncCB, config) => {
    // Callback for create new burger ingredient
    const builderModelFuncCB = (id, ingredient) => {
        const burgerIngredient = new BurgerIngredientModelBuilder()
            .setId(id)
            .setType(ingredient.type)
            .setLabel(ingredient.label)
            .setPrice(ingredient.price)
            .setPosition(ingredient.position)
            .setCreateDate(ingredient.createDate)
            .setCreateUser(ingredient.createUser)
            .build();
        
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

const burgerIngredientFindAllGeneratorFuncService = function* (options) {
    const { config, successFuncCB, errorFuncCB } = options;

    // Callback for create new burger ingredient
    const builderModelFuncCB = (id, ingredient) => {
        const burgerIngredient = new BurgerIngredientModelBuilder()
            .setId(id)
            .setType(ingredient.type)
            .setLabel(ingredient.label)
            .setPrice(ingredient.price)
            .setPosition(ingredient.position)
            .setCreateDate(ingredient.createDate)
            .setCreateUser(ingredient.createUser)
            .build();

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
const burgerIngredientFindByIdService = (id, successFuncCB, errorFuncCB) => {
   // Callback for create new burger ingredient
    const builderModelFuncCB = (id, ingredient) => {
        const burgerIngredient = new BurgerIngredientModelBuilder()
            .setId(id)
            .setType(ingredient.type)
            .setLabel(ingredient.label)
            .setPrice(ingredient.price)
            .setPosition(ingredient.position)
            .setCreateDate(ingredient.createDate)
            .setCreateUser(ingredient.createUser)
            .build();
        
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

export { 
    burgerIngredientFindAllService, burgerIngredientFindAllGeneratorFuncService, burgerIngredientFindByIdService
};