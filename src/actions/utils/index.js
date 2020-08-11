/**
 * Create one action
 * 
 * @param {constant} type 
 * @param {object} options 
 */
export const createAction = (type, options) => {
    if (options) {
        return {
            type,
            ...options
        }
    }

    return {
        type
    }
}

export { fetchAction, fetchActionStart, fetchActionSuccess, fetchActionFail } from './fetch';