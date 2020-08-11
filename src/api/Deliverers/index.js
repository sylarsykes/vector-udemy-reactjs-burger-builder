import { BaseAdminModel } from '../';

export const DELIVERERS_BASE_URL = 'deliverers';

/**
 * Deliverers model
 * 
 * Properties:
 *      -   name
 *      -   surname
 *      -   fullName?
 *      -   email
 *      -   age
 *      -   phoneNumber
 * 
 * @see BaseAdminModel
 * 
 */
export class DeliverersModel extends BaseAdminModel.extend({
    name: String,
    surname: String,
    fullName: [String],
    email: String,
    age: Number,
    phoneNumber: [String]
}) {

}

/**
 * Build deliverers model
 *  
 * @param {object} properties
 *      Json object with properties
 *          -   name
 *          -   surname
 *          -   fullName?
 *          -   email
 *          -   age
 *          -   phoneNumber
 * 
 * @see BaseAdminModel.build
 */
DeliverersModel.build = (properties) => {
    if (!properties.fullName) {
        properties.fullName = properties.name + " " + properties.surname;
    }

    return new DeliverersModel(properties);
};