import { ArrayModel } from 'objectmodel';
import { BaseAdminModel, AdressesModel } from '../';

export const CUSTOMERS_BASE_URL = 'customers';

/**
 * Customers model
 * 
 * Properties:
 *      -   name
 *      -   surname
 *      -   fullName?
 *      -   email
 *      -   age
 *      -   phoneNumber
 *      -   addresses
 * 
 * @see BaseAdminModel
 * @see ArrayModel
 * @see AdressesModel
 * 
 */
export class CustomersModel extends BaseAdminModel.extend({
    name: String,
    surname: String,
    fullName: [String],
    email: String,
    age: Number,
    phoneNumber: [String],
    adresses: ArrayModel(AdressesModel)
}) {

}

/**
 * Build customers model
 *  
 * @param {object} properties
 *      Json object with properties
 *          -   name
 *          -   surname
 *          -   fullName?
 *          -   email
 *          -   age
 *          -   phoneNumber
 *          -   addresses
 * 
 * @see BaseAdminModel.build
 */
CustomersModel.build = (properties) => {
    if (!properties.fullName) {
        properties.fullName = properties.name + " " + properties.surname;
    }

    return new CustomersModel(properties);
};