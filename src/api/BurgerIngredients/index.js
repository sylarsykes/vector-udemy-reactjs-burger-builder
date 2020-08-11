import { BaseAdminModel } from '..';

export const BURGER_INGREDIENTS_BASE_URL = 'burger-ingredients';

/**
 * Types of ingredients
 */
export const TypesBurgerIngredients = [
    "bread_top",
    "bread_bottom",
    "bacon",
    "cheese",
    "egg",
    "pickles",
    "salad",
    "meat"
];

/**
 * Burger ingredients model
 * 
 * Properties:
 *      -   name
 *      -   type
 *      -   position
 *      -   price
 */
export class BurgerIngredientsModel extends BaseAdminModel.extend({
    name: String,
    type: TypesBurgerIngredients,
    position: Number,
    price: Number
}) {

}

/**
 * Build burger ingredients model
 *  
 * @param {object} properties
 *      Json object with properties
 *          -   name
 *          -   type
 *          -   position
 *          -   price
 * 
 * @see BaseAdminModel.build
 */
BurgerIngredientsModel.build = (properties) => {
    return new BurgerIngredientsModel(properties);
}