import { ArrayModel } from 'objectmodel';
import { BaseAdminModel, BurgerIngredientsModel, CustomersModel } from '..';

export const CUSTOM_BURGER_BASE_URL = 'my-burgers';

/**
 * Custom burgers model
 * 
 * Properties:
 *      -   name
 *      -   price
 *      -   customer
 *      -   customerUserId
 *      -   ingredients
 * 
 * @see BaseAdminModel
 * @see ArrayModel
 * @see BurgerIngredientsModel
 */
export class CustomBurgersModel extends BaseAdminModel.extend({
    name: String,
    price: Number,
    customer: CustomersModel,
    customerUserId: String,
    ingredients: ArrayModel(BurgerIngredientsModel) 
}) {

}

/**
 * Build custom burgers model
 *  
 * @param {object} properties 
 *      Json object with properties
 *          -   name
 *          -   price
 *          -   customer
 *          -   customerUserId
 *          -   ingredients
 * 
 * @see BaseAdminModel.build
 */
CustomBurgersModel.build = (properties) => {
    return new CustomBurgersModel(properties);
}