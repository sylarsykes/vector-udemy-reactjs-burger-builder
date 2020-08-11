import { Model } from 'objectmodel';
import { morphism } from 'morphism';

export const AuthenticatedUsersSchemaModel = {
    userUID: 'localId',
    displayName: 'displayName',
    email: 'email',
    token: 'idToken',
    refreshToken: 'refreshToken',
    expiresIn: 'expiresIn',
    registered: 'registered'
}

/**
 * Firebase authenticated users model
 * 
 * Properties
 *      -   userUID
 *      -   
 * 
 * @see Model
 * @see https://console.firebase.google.com/u/0/project/{project}/authentication/users
 */
export class AuthenticatedUsersModel extends Model({
    userUID: String,
    displayName: [String],
    email: String,
    token: String,
    refreshToken: String,
    expiresIn: String,
    registered: Boolean
}) {
    
    /**
     * Check if user is authenticated
     */
    isAuthenticated() {
        return (this.token !== null && this.registered);
    }
}

/**
 * Build users model
 * 
 * @param {object} properties 
 */
AuthenticatedUsersModel.build = (properties) => new AuthenticatedUsersModel(properties);

/**
 *
 * @param {object} responseProperties 
 */
AuthenticatedUsersModel.mapperBuild = (responseProperties) => AuthenticatedUsersModel.build(morphism(AuthenticatedUsersSchemaModel, responseProperties));