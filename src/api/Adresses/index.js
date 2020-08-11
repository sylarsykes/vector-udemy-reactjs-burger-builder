import { BaseAdminModel } from '../';

/**
 * Adresses model
 * 
 * Properties:
 *      -   street
 *      -   city
 *      -   state
 *      -   country
 *      -   zipCode
 * 
 * @see BaseAdminModel
 */
export class AdressesModel extends BaseAdminModel.extend({
    strret: String,
    city: String,
    state: String,
    zipCode: Number,
    country: String
}) {

}

/**
 * Build adresses model
 * 
 * @param {object} properties
 *      Json object with properties:
 *          -   street
 *          -   city
 *          -   state
 *          -   country
 *          -   zipCode
 * 
 * @see BaseAdminModel.build
 */
AdressesModel.build = (properties) => {
    return new AdressesModel(properties);
}