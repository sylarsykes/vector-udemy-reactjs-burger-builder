import { fetchAction, fetchActionStart, fetchActionSuccess, fetchActionFail } from '../../utils';

export const FETCH_COUNTRIES = 'FETCH_COUNTRIES';
export const FETCH_COUNTRIES_START = 'FETCH_COUNTRIES_START';
export const FETCH_COUNTRIES_SUCCESS = 'FETCH_COUNTRIES_SUCCESS';
export const FETCH_COUNTRIES_FAIL = 'FETCH_COUNTRIES_FAIL';

/**
 * Fetch all countries
 * 
 * @see fetchAction 
 */
export const fetchCountries = () => fetchAction(FETCH_COUNTRIES);

/**
 * Fetch countries start
 * 
 * @see fetchActionStart
 */
export const fetchCountriesStart = () => fetchActionStart(FETCH_COUNTRIES_START);

/**
 * Success fetch countries action
 * 
 * @param {Array} countries
 *      List of objects of countries
 * 
 * @see fetchActionSuccess 
 */
export const fetchCountriesSuccess = (countries) => fetchActionSuccess(FETCH_COUNTRIES_SUCCESS, { countries });

/**
 * Error action in fetch countries
 * 
 * @param {object} error
 *      Error
 *  
 * @see fetchActionFail 
 */
export const fetchCountriesFail = (error) => fetchActionFail(FETCH_COUNTRIES_FAIL, { error });