
import { usersCreateService, usersVerifyService } from '../../../components/services';

const AUTH_START = 'AUTH_START';
const AUTH_SUCCESS = 'AUTH_SUCCESS';
const AUTH_FAIL = 'AUTH_FAIL';
const AUTH_LOGOUT = 'AUTH_LOGOUT';

const SET_AUTH_REDIRECT_PATH = 'SET_AUTH_REDIRECT_PATH';

const LOCAL_STORATEGE_SET_TOKEN = 'token';
const LOCAL_STORATEGE_SET_EXPIRATION_DATE = 'expirationDate';
const LOCAL_STORAGE_SET_USERID = 'userId';

/**
 * Start authentication action
 */
const authStart = () => {
    return {
        type: AUTH_START
    };
};

/**
 * Authentication success action
 * 
 * @param {string} token
 *      Auth token 
 * @param {string} userId
 *      User UID 
 */
const authSuccess = (token, userId) => {
    return {
        type: AUTH_SUCCESS,
        idToken: token,
        userId
    };
};

/**
 * Error authentication action
 * 
 * @param {object} error 
 */
const authFail = (error) => {
    return {
        type: AUTH_FAIL,
        error
    };
};

/**
 * Logout action
 */
const logout = () => {
    localStorage.removeItem(LOCAL_STORATEGE_SET_TOKEN);
    localStorage.removeItem(LOCAL_STORATEGE_SET_EXPIRATION_DATE);
    localStorage.removeItem(LOCAL_STORAGE_SET_USERID);

    return {
        type: AUTH_LOGOUT
    };
};

/**
 * Check authentication timeout
 * 
 * @param {number} expirationTime
 *      Expiration time 
 */
const checkAuthTimeout = (expirationTime) => dispatch => 
    setTimeout(() => dispatch(logout()) , expirationTime * 1000);

/**
 * Authentication
 * 
 * @param {string} email 
 * @param {string} password 
 * @param {boolean} isSignup
 * 
 */
const auth = (email, password, isSignup) => dispatch => {
    dispatch(authStart());

    const options = {
        body:{
            email,
            password,
            returnSecureToken: true
        },
        successFuncCB: (result) => {
            console.log(result);

            const expirationDate = new Date(new Date().getTime() + result.expiresIn * 1000);
            localStorage.setItem(LOCAL_STORATEGE_SET_TOKEN, result.idToken);
            localStorage.setItem(LOCAL_STORATEGE_SET_EXPIRATION_DATE, expirationDate);
            localStorage.setItem(LOCAL_STORAGE_SET_USERID, result.localId);

            dispatch(authSuccess(result.idToken, result.localId));
            dispatch(checkAuthTimeout(result.expiresIn));
        },
        errorFuncCB: (error) => dispatch(authFail(error.error))
    };

    if (!isSignup) {
        usersVerifyService(options);
    } else {
        usersCreateService(options);
    }
};

/**
 * Set authentication redirect path
 * 
 * @param {string} path 
 */
const setAuthRedirectPath = (path) => {
    return {
        type: SET_AUTH_REDIRECT_PATH,
        path
    };
};

/**
 * Check authentication state
 */
const authCheckState = () => dispatch => {
    const token = localStorage.getItem(LOCAL_STORATEGE_SET_TOKEN);
    if (!token) {
        dispatch(logout());
    } else {
        const expirationDate = new Date(localStorage.getItem(LOCAL_STORATEGE_SET_EXPIRATION_DATE));
        if (expirationDate <= new Date()) {
            dispatch(logout());
        } else {
            const userId = localStorage.getItem(LOCAL_STORAGE_SET_USERID);
            dispatch(authSuccess(token, userId));
            dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000 ));
        } 
    }
};

export {
    // CONSTANTS
    AUTH_START, AUTH_SUCCESS, AUTH_FAIL,
    AUTH_LOGOUT, SET_AUTH_REDIRECT_PATH,
    // ACTIONS
    authStart, authSuccess, authFail,
    logout, checkAuthTimeout, auth,
    setAuthRedirectPath, authCheckState
};