import {
    AUTH_START, AUTH_SUCCESS, AUTH_FAIL,
    AUTH_LOGOUT, SET_AUTH_REDIRECT_PATH,
} from '../../../actions';
import { updateObject } from '../../../components/utils';
import { BURGER_BUILDER_ROUTE } from '../../../containers/routes'

const initialState = {
    authenticatedUser: null,
    error: null,
    loading: false,
    authRedirectPath: BURGER_BUILDER_ROUTE
};

const authStart = (state, action) => updateObject(state, { 
    error: null, 
    loading: true 
});

const authSuccess = (state, action) => updateObject( state, { 
    authenticatedUser: action.authenticatedUser,
    error: null,
    loading: false
});

const authFail = (state, action) => updateObject(state, {
    error: action.error,
    loading: false
});

const authLogout = (state, action) => updateObject(state, {
    authenticatedUser: null
});

const setAuthRedirectPath = (state, action) => updateObject(state, {
    authRedirectPath: action.path
});

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_START:
            return authStart(state, action);
        case AUTH_SUCCESS:
            return authSuccess(state, action);
        case AUTH_FAIL:
            return authFail(state, action);
        case AUTH_LOGOUT:
            return authLogout(state, action);
        case SET_AUTH_REDIRECT_PATH:
            return setAuthRedirectPath(state, action);
        default:
            return state;
    }
};