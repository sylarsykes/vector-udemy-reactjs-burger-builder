import { 
    baseFindAllService, baseFindByIdService, BURGER_BASE_URL, 
    BurgerModelBuilder 
} from '../../../';

const BURGER_FIND_ALL_PATH = '.json';

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
    
    baseFindAllService({
        path: BURGER_INGREDIENTS_BASE_URL + BURGER_INGREDIENT_FIND_ALL_PATH,
        builderModelFuncCB: builderModelFuncCB,
        successFuncCB: successFuncCB,
        errorFuncCB: errorFuncCB
    });

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
    
    baseFindByIdService({
        path: BURGER_INGREDIENTS_BASE_URL + '/' + BURGER_INGREDIENT_FIND_BY_ID_PATH(id),
        id: id,
        builderModelFuncCB: builderModelFuncCB,
        successFuncCB: successFuncCB,
        errorFuncCB: errorFuncCB
    });
}

export { burgerIingredientFindAllService, burgerIngredientFindByIdService };