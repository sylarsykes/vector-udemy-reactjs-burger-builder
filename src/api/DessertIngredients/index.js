import { BaseAdminModel } from '..';

export const DESSERT_INGREDIENTS_BASE_URL = 'dessert-ingredients';

/**
 * Types of ingredients
 */
export const TypesDessertIngredients = [
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
 * Ingredients model
 * 
 * Properties:
 *      -   name
 *      -   type
 *      -   position
 *      -   price
 */
export class DessertIngredientsModel extends BaseAdminModel.extend({
    name: String,
    type: TypesDessertIngredients,
    position: Number,
    price: Number
}) {

}

/**
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
DessertIngredientsModel.build = (properties) => {
    return new DessertIngredientsModel(properties);
}