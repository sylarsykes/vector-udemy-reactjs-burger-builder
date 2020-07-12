import firebaseConfig from '../../../../config/firebase';
import axios from 'axios'; 

const AUTH_START = 'AUTH_START';
const AUTH_SUCCESS = 'AUTH_SUCCESS';
const AUTH_FAIL = 'AUTH_FAIL';
const AUTH_LOGOUT = 'AUTH_LOGOUT';

const SET_AUTH_REDIRECT_PATH = 'SET_AUTH_REDIRECT_PATH';

const authStart = () => {
    return {
        type: AUTH_START
    };
};

const authSuccess = (token, userId) => {
    return {
        type: AUTH_SUCCESS,
        idToken: token,
        userId
    };
};

const authFail = (error) => {
    return {
        type: AUTH_FAIL,
        error
    };
};

const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');

    return {
        type: AUTH_LOGOUT
    };
};

const checkAuthTimeout = (expirationTime) => dispatch => 
    setTimeout(() => dispatch(logout()) , expirationTime * 1000);

/**
 * 
 * @param {*} email 
 * @param {*} password 
 * @param {*} isSignup
 * 
 * @see https://firebase.google.com/docs/reference/rest/auth
 * @see https://firebase.google.com/docs/reference/rest/auth#section-create-email-password
 */
const auth = (email, password, isSignup) => dispatch => {
    dispatch(authStart());
    const authData = {
        email,
        password,
        returnSecureToken: true
    };

    const identityToolkitBaseUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:';
    const url = (!isSignup) ? 
        identityToolkitBaseUrl + 'resetPassword?key=' + firebaseConfig.apiKey
            : identityToolkitBaseUrl + 'signUp?key=' + firebaseConfig.apiKey;

    axios.post(url, authData)
        .then(response => {
            console.log(response);

            const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
            localStorage.setItem('token', response.data.idToken);
            localStorage.setItem('expirationDate', expirationDate);
            localStorage.setItem('userId', response.data.localId);

            dispatch(authSuccess(response.data.idToken, response.data.localId));
            dispatch(checkAuthTimeout(response.data.expiresIn));
        })
        .catch(err => {
            dispatch(authFail(err.response.data.error));
        });


};

const setAuthRedirectPath = (path) => {
    return {
        type: SET_AUTH_REDIRECT_PATH,
        path
    };
};

const authCheckState = () => dispatch => {
    const token = localStorage.getItem('token');
    if (!token) {
        dispatch(logout());
    } else {
        const expirationDate = new Date(localStorage.getItem('expirationDate'));
        if (expirationDate <= new Date()) {
            dispatch(logout());
        } else {
            const userId = localStorage.getItem('userId');
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