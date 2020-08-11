import { ArrayModel } from 'objectmodel';
import { BaseAdminModel, DessertIngredientsModel } from '../';

export const DESSERTS_BASE_URL = 'desserts';

/**
 * Types of desserts
 */
export const TypesDesserts = [
    "standard",
    "healthy",
    "vegan"
];

/**
 * Desserts model
 * 
 * Properties:
 *      -   name
 *      -   type
 *      -   price
 *      -   ingredients
 * 
 * @see BaseAdminModel
 * @see ArrayModel
 * @see DessertIngredientsModel
 * 
 */
export class DessertsModel extends BaseAdminModel.extend({
    name: String,
    type: TypesDesserts,
    price: Number,
    ingredients: ArrayModel(DessertIngredientsModel)
}) {

}

/**
 * Build dessert model
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
DessertsModel.build = (properties) => {
    return new DessertsModel(properties);
};