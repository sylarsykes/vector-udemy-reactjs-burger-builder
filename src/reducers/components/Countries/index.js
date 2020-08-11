import {
    FETCH_COUNTRIES_START, FETCH_COUNTRIES_SUCCESS, FETCH_COUNTRIES_FAIL
} from '../../../actions';
import { updateObject } from '../../../utils';

const initialState = {
    countries: [],
    loading: false
};

/**
 * Fetch orders start
 *  
 * @param {*} state 
 * @param {*} action 
 */
const fetchCountriesStart = (state, action) => updateObject(state, {loading: true });

/**
 * Fetch orders success
 *  
 * @param {*} state 
 * @param {*} action 
 */
const fetchCountriesSuccess = (state, action) => updateObject(state, {
    countries: action.countries,
    loading: false
});

/**
 * Fetch orders fail
 *  
 * @param {*} state 
 * @param {*} action 
 */
const fetchCountriesFail = (state, action) => updateObject(state, { loading: false });

/**
 * Countries reducer
 *  
 * @param {*} state 
 * @param {*} action 
 */
export const countriesReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_COUNTRIES_START:
            return fetchCountriesStart(state, action);
        case FETCH_COUNTRIES_SUCCESS:
            return fetchCountriesSuccess(state, action);
        case FETCH_COUNTRIES_FAIL:
            return fetchCountriesFail(state, action);
        default:
            return state;
    }
};