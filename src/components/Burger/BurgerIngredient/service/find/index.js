import { baseFindAllService, BURGER_INGREDIENTS_BASE_URL, BurgerIngredientModelBuilder } from '../../../../';

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
    
    baseFindAllService({
        path: BURGER_INGREDIENTS_BASE_URL,
        builderModelFuncCB: builderModelFuncCB,
        successFuncCB: successFuncCB,
        errorFuncCB: errorFuncCB
    });

};

export default burgerIingredientFindAllService;