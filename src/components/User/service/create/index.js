import firebaseConfig from '../../../../../config/firebase';
import { USERS_BASE_URL } from '../../constants';
import { UserModelBuilder } from '../../api';
import { basePostService, ServiceParamsBuilder } from '../../../Common';


const USERS_CREATE_URL = USERS_BASE_URL + 'signUp?key=' + firebaseConfig.apiKey;

/**
 * Create new user service
 *  
 * @param {object} options
 *      Properties:
 *          - body              Objet with data
 *          - successFuncCB     Success callback
 *          - errorFuncCB       Error callback
 * 
 * @see https://firebase.google.com/docs/reference/rest/auth
 * @see https://firebase.google.com/docs/reference/rest/auth#section-create-email-password 
 */
const usersCreateService = (options) => {
    const { body, successFuncCB, errorFuncCB, builderFuncCB } = options;

    const user = (builderFuncCB) ? builderFuncCB(body) :  new UserModelBuilder()
        .setEmail(body.email)
        .setPassword(body.password)
        .setReturnSecureToken(body.returnSecureToken)
        .build();
    
    const serviceParams = new ServiceParamsBuilder()
        .setRequest({
            path: USERS_CREATE_URL,
            body: user
        })
        .setSuccessFuncCB(successFuncCB)
        .setErrorFuncCB(errorFuncCB)
        .build();

    basePostService(serviceParams); 
}

const USERS_VERIFY_URL = USERS_BASE_URL + 'signInWithPassword?key=' + firebaseConfig.apiKey;

/**
 * Reset password service
 *  
 * @param {object} options
 *      Properties:
 *          - body              Objet with data
 *          - successFuncCB     Success callback
 *          - errorFuncCB       Error callback
 * 
 * @see https://firebase.google.com/docs/reference/rest/auth
 * @see https://firebase.google.com/docs/reference/rest/auth#section-sign-in-email-password
 */
const usersVerifyService = (options) => {
    const { body, successFuncCB, errorFuncCB, builderFuncCB } = options;

    const user = (builderFuncCB) ? builderFuncCB(body) : new UserModelBuilder()
        .setEmail(body.email)
        .setPassword(body.password)
        .setReturnSecureToken(body.returnSecureToken)
        .build();

    const serviceParams = new ServiceParamsBuilder()
        .setRequest({
            path: USERS_VERIFY_URL,
            body: user
        })
        .setSuccessFuncCB(successFuncCB)
        .setErrorFuncCB(errorFuncCB)
        .build();

    basePostService(serviceParams);
}

export {
    usersCreateService, usersVerifyService
};