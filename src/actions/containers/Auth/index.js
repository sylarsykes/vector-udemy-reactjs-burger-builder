
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
    return {
        type: AUTH_INITIATE_LOGOUT
    };
};

const logoutSucceed = () => {
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
const checkAuthTimeout = (expirationTime) => {
    return {
        type: AUTH_CHECK_TIMEOUT,
        expirationTime
    }
}

/**
 * Authentication
 * 
 * @param {string} email 
 * @param {string} password 
 * @param {boolean} isSignup
 * 
 */
const auth = (email, password, isSignup) => {
    return {
        type: AUTH_USER,
        email,
        password,
        isSignup
    }
}

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
const authCheckState = () => {
    return {
        type: AUTH_CHECK_STATE
    }
}

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