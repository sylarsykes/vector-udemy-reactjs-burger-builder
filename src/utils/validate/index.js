import { isEmpty } from 'lodash';

/**
 * It checks the value by the rule it receives as a parameter
 * 
 * @param {any} value
 *      Value to validate 
 * @param {object} rules
 *      Rule for validate value 
 */
export const checkValidity = (value, rules) => {
    let isValid = true;
    if ( !rules ) {
        return true;
    }

    if ( rules.required ) {
        isValid = !isEmpty(value) && isValid;
    }

    if ( rules.minLength ) {
        isValid =  value.length >= rules.minLength && isValid;
    }

    if ( rules.maxLength ) {
        isValid = value.length <= rules.maxLength && isValid;
    }

    if ( rules.isEmail ) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isValid = pattern.test(value) && isValid;
    }

    if ( rules.isNumeric ) {;
        const pattern = /^\d+$/;
        isValid = pattern.test(value) && isValid;
    }

    return isValid;
}
