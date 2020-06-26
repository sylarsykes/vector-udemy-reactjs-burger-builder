import { 
    baseFindAllService, baseFindByIdService, BURGER_INGREDIENTS_BASE_URL, 
    BurgerIngredientModelBuilder, FindServiceParamsBuilder 
} from '../../../../../';

const BURGER_INGREDIENT_FIND_ALL_PATH = '.json';

/**
 * Find all service
 * 
 * @param {*} successFuncCB 
 *      Success callback to execute
 * @param {*} errorFuncCB
 *      Error callback to execute
 */
const burgerIingredientFindAllService = (successFuncCB, errorFuncCB) => {
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
            path: BURGER_INGREDIENTS_BASE_URL + BURGER_INGREDIENT_FIND_ALL_PATH, 
        })
        .setBuilderModelFuncCB(builderModelFuncCB)
        .setSuccessFuncCB(successFuncCB)
        .setErrorFuncCB(errorFuncCB)
        .build();
    
    baseFindAllService(serviceParams);

};

/* eslint-disable no-template-curly-in-string */
// eslint-disable-next-line no-eval
const BURGER_INGREDIENT_FIND_BY_ID_PATH = (id) => eval('`' + BURGER_INGREDIENTS_BASE_URL + '/${id}`');

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
    burgerIingredientFindAllService, burgerIngredientFindByIdService 
};