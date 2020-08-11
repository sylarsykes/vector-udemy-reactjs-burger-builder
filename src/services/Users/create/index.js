import firebaseConfig from '../../../../config/firebase';
import { USERS_BASE_URL, UsersModel } from '../../../api/Users';
import { AuthenticatedUsersModel } from '../../../api/AuthenticatedUsers';
import { 
    basePostService, ServiceParamsBuilder, basePostGeneratorFuncService 
} from '../../Common';
import { call } from 'redux-saga/effects';

const USERS_CREATE_URL = USERS_BASE_URL + 'signUp?key=' + firebaseConfig.apiKey;

/**
 * Create new user service
 *  
 * @param {object} options
 *      Properties:
 *          - body              Objet with data
 *          - successFuncCB     Success callback
 *          - errorFuncCB       Error callback
 *          - builderFuncCB?     (optional) Builder model callback
 * 
 * @see https://firebase.google.com/docs/reference/rest/auth
 * @see https://firebase.google.com/docs/reference/rest/auth#section-create-email-password 
 */
export const usersCreateService = (options) => {
    const { body, successFuncCB, errorFuncCB, builderFuncCB } = options;

    const user = (builderFuncCB) ? builderFuncCB(body) : UsersModel.build(body);
    const resultResponseSuccessFuncCB = (result) => {
        return {
            authenticatedUser: AuthenticatedUsersModel.mapperBuild(result)
        }
    };

    const serviceParams = new ServiceParamsBuilder()
        .setRequest({
            path: USERS_CREATE_URL,
            body: user
        })
        .setSuccessFuncCB(successFuncCB)
        .setResultResponseSuccessFuncCB(resultResponseSuccessFuncCB)
        .setErrorFuncCB(errorFuncCB)
        .build();

    basePostService(serviceParams);
}

/**
 * Create new user service
 *  
 * @param {object} options
 *      Properties:
 *          - body               Objet with data
 *          - successFuncCB*     Generator success callback
 *          - errorFuncCB*       Generator error callback
 *          - builderFuncCB?     (optional) Generator builder model callback
 * 
 * @see https://firebase.google.com/docs/reference/rest/auth
 * @see https://firebase.google.com/docs/reference/rest/auth#section-create-email-password 
 */
export const usersCreateGeneratorFuncService = function* (options) {
    const { body, successFuncCB, errorFuncCB, builderFuncCB } = options;

    const user = (builderFuncCB) ? yield call(builderFuncCB, body): yield UsersModel.build(body);
    const resultResponseSuccessFuncCB = (result) => {
        return {
            authenticatedUser : AuthenticatedUsersModel.mapperBuild(result)
        }
    };

    const serviceParams = yield new ServiceParamsBuilder()
        .setRequest({
            path: USERS_CREATE_URL,
            body: user
        })
        .setSuccessFuncCB(successFuncCB)
        .setResultResponseSuccessFuncCB(resultResponseSuccessFuncCB)
        .setErrorFuncCB(errorFuncCB)
        .build();

    yield call(basePostGeneratorFuncService, serviceParams);
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
 *          - builderFuncCB?     (optional) Generator builder model callback
 * 
 * @see https://firebase.google.com/docs/reference/rest/auth
 * @see https://firebase.google.com/docs/reference/rest/auth#section-sign-in-email-password
 */
export const usersVerifyService = (options) => {
    const { body, successFuncCB, errorFuncCB, builderFuncCB } = options;

    const user = (builderFuncCB) ? builderFuncCB(body) : UsersModel.build(body);
    const resultResponseSuccessFuncCB = (result) => {
        return {
            authenticatedUser: AuthenticatedUsersModel.mapperBuild(result)
        }
    };

    const serviceParams = new ServiceParamsBuilder()
        .setRequest({
            path: USERS_VERIFY_URL,
            body: user
        })
        .setSuccessFuncCB(successFuncCB)
        .setResultResponseSuccessFuncCB(resultResponseSuccessFuncCB)
        .setErrorFuncCB(errorFuncCB)
        .build();

    basePostService(serviceParams);
}

/**
 * Create new user service
 *  
 * @param {object} options
 *      Properties:
 *          - body               Objet with data
 *          - successFuncCB*     Generator success callback
 *          - errorFuncCB*       Generator error callback
 *          - builderFuncCB?     (optional) Generator builder model callback
 * 
 * @see https://firebase.google.com/docs/reference/rest/auth
 * @see https://firebase.google.com/docs/reference/rest/auth#section-create-email-password 
 */
export const usersVerifyGeneratorFuncService = function* (options) {
    const { body, successFuncCB, errorFuncCB, builderFuncCB } = options;

    const user = (builderFuncCB) ? yield call(builderFuncCB, body): yield UsersModel.build(body);
    const resultResponseSuccessFuncCB = (result) => {
        return {
            authenticatedUser: AuthenticatedUsersModel.mapperBuild(result)
        }
    };

    const serviceParams = yield new ServiceParamsBuilder()
        .setRequest({
            path: USERS_VERIFY_URL,
            body: user
        })
        .setSuccessFuncCB(successFuncCB)
        .setResultResponseSuccessFuncCB(resultResponseSuccessFuncCB)
        .setErrorFuncCB(errorFuncCB)
        .build();

    yield call(basePostGeneratorFuncService, serviceParams);
}