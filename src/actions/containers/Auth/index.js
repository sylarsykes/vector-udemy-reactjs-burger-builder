import { createAction } from '../../utils';


const AUTH_START = 'AUTH_START';
const AUTH_SUCCESS = 'AUTH_SUCCESS';
const AUTH_FAIL = 'AUTH_FAIL';
const AUTH_LOGOUT = 'AUTH_LOGOUT';
const AUTH_USER = 'AUTH_USER';
const AUTH_CHECK_STATE = 'AUTH_CHECK_STATE';
const AUTH_CHECK_TIMEOUT = 'AUTH_CHECK_TIMEOUT';
const AUTH_INITIATE_LOGOUT = 'AUTH_INITIATE_LOGOUT';

const SET_AUTH_REDIRECT_PATH = 'SET_AUTH_REDIRECT_PATH';

/**
 * Start authentication action
 */
const authStart = () => createAction(
    {
        type: AUTH_START
    }
);

/**
 * Authentication success action
 * 
 * @param {object} authenticatedUser
 *      AuthenticatedUsersModel
 */
const authSuccess = (authenticatedUser) => createAction(AUTH_SUCCESS, {
        authenticatedUser
    }
);

/**
 * Error authentication action
 * 
 * @param {object} error 
 */
const authFail = (error) => createAction(AUTH_FAIL, {
        error
    }
);

/**
 * Logout action
 */
const logout = () => createAction(AUTH_INITIATE_LOGOUT);

const logoutSucceed = () => createAction(AUTH_LOGOUT);

/**
 * Check authentication timeout
 * 
 * @param {number} expirationTime
 *      Expiration time 
 */
const checkAuthTimeout = (expirationTime) => createAction(AUTH_CHECK_TIMEOUT, {
        expirationTime
    }
);

/**
 * Authentication
 * 
 * @param {string} email 
 * @param {string} password 
 * @param {boolean} isSignup
 * 
 */
const auth = (email, password, isSignup) => createAction(AUTH_USER, {
        email,
        password,
        isSignup
    }
);

/**
 * Set authentication redirect path
 * 
 * @param {string} path 
 */
const setAuthRedirectPath = (path) => createAction(SET_AUTH_REDIRECT_PATH, {
        path
    }
);

/**
 * Check authentication state
 */
const authCheckState = () => createAction(AUTH_CHECK_STATE);

export {
    // CONSTANTS
    AUTH_START, AUTH_SUCCESS, AUTH_FAIL,
    AUTH_LOGOUT, AUTH_CHECK_STATE, AUTH_CHECK_TIMEOUT,
    AUTH_INITIATE_LOGOUT, AUTH_USER, SET_AUTH_REDIRECT_PATH,
    // ACTIONS
    authStart, authSuccess, authFail,
    logout, logoutSucceed, checkAuthTimeout, 
    auth, setAuthRedirectPath, authCheckState
};