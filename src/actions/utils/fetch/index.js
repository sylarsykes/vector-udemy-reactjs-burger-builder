import { createAction } from '../';

/**
 * Create structure for fetch action
 *  
 * @param {constant} type 
 * @param {object} options
 *      (optional) object with parameters for fetch service
 * 
 * @see createAction 
 */
export const fetchAction = (type, options) => createAction(type, options);

/**
 * Create structure for fetch action start
 *  
 * @param {constant} type 
 * @param {object} options
 *      (optional) object with parameters for fetch service
 * 
 * @see createAction 
 */
export const fetchActionStart = (type, options) => createAction(type, options);

/**
 * Create structure for fetch action success
 *  
 * @param {constant} type 
 * @param {object} options
 *      (optional) object with parameters for fetch service
 * 
 * @see createAction 
 */
export const fetchActionSuccess = (type, options) => createAction(type, options);

/**
 * Create structure for fetch action fail
 *  
 * @param {constant} type 
 * @param {object} options
 *      (optional) object with parameters for fetch service
 * 
 * @see createAction 
 */
export const fetchActionFail = (type, options) => createAction(type, options);