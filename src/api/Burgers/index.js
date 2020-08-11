import { ArrayModel } from 'objectmodel';
import { BaseAdminModel, BurgerIngredientsModel } from '../';

/**
 * Firebase burgers base url
 */
export const BURGER_BASE_URL = 'burgers';

/**
 * Types of desserts
 */
export const TypesBurgers = [
    "standard",
    "vegan"
];

/**
 * Burgers model
 * 
 * Properties:
 *      -   name
 *      -   type
 *      -   price
 *      -   ingredients
 * 
 * @see BaseAdminModel
 * @see ArrayModel
 * @see IngredientsModel
 */
export class BurgersModel extends BaseAdminModel.extend({
    name: String,
    type: TypesBurgers,
    price: Number,
    ingredients: ArrayModel(BurgerIngredientsModel) 
}) {

}

/**
 * Build burgers model
 * 
 * @param {object} properties 
 *      Json object with properties
 *          -   name
 *          -   type
 *          -   price
 *          -   ingredients
 * 
 * @see BaseAdminModel.build
 */
BurgersModel.build = (properties) => {
    return new BurgersModel(properties);
}