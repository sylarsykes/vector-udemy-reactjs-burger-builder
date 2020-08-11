import { BaseAdminModel } from '../';

export const DRINKS_BASE_URL = 'drinks';

/**
 * Types of drinks
 */
export const TypesDrinks = [
    "drink",
    "alcoholic_drink"
];

/**
 * Drinks model
 * 
 * Properties:
 *      -   name
 *      -   type
 *      -   price
 */
export class DrinksModel extends BaseAdminModel.extend({
    name: String,
    type: TypesDrinks,
    price: Number
}) {

}

/**
 * 
 * @param {object} properties
 *      Json object with properties
 *          -   name
 *          -   type
 *          -   price
 * 
 * @see BaseAdminModel.build
 */
DrinksModel.build = (properties) => {
    return new DrinksModel(properties);
}