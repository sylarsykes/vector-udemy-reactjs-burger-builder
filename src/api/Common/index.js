import { Model } from 'objectmodel';

// @see https://objectmodel.js.org/

/**
 * Base model
 * 
 * Properties:
 *      - id
 */
export class BaseModel extends Model({ 
    id : String
}) {

}

/**
 * Build base model
 *  
 * @param {object} properties
 *      json object with properties 
 */
BaseModel.build = (properties) => {
    return new BaseModel(properties);
};

/**
 * Base admin model
 * 
 * Properties:
 *      -   createDate
 *      -   createUser
 *      -   updateDate
 *      -   updateUser
 *      -   removeDate
 *      -   removeUser
 */
export class BaseAdminModel extends BaseModel.extend({ 
    createDate: Date, 
    createUser: String, 
    updateDate: [Date],
    updateUser: [String],
    removeDate: [Date],
    removeUser: [String]
}) {

}

/**
 * Build BaseAdminModel
 *  
 * @param {object} properties
 *      Json object with properties 
 *          -   createDate
 *          -   createUser
 *          -   updateDate
 *          -   updateUser
 *          -   removeDate
 *          -   removeUser
 * 
 * @see BaseModel.build
 */
BaseAdminModel.build = (properties) => {
    return new BaseAdminModel(properties);
}