import axios from '../../../../config/axios';
import { call } from 'redux-saga/effects';
import { isFunction, isError } from 'lodash';

/**
 * Execute success callback
 * 
 * @param {object} options
 *      Json object with properties
 *          -   response
 *          -   successFuncCB                   Success function callback
 *          -   resultResponseSuccessFuncCB     Result response function callback 
 */
export const responseServiceSuccessFuncCB = (options) => {
    const { response, successFuncCB, resultResponseSuccessFuncCB } = options;
    let result = (response && response.data) ? response.data : null;

    if (result && isFunction(resultResponseSuccessFuncCB)) {
        result = resultResponseSuccessFuncCB(result);
    } 

    if (isFunction(successFuncCB)) {
        successFuncCB(result);
    } else {
        console.log("SuccessFuncCB is not a callback");
    }
}

/**
 * Execute success generator callback
 * 
 * @param {object} options
 *      Json object with properties
 *          -   response
 *          -   successFuncCB                   Success function callback
 *          -   resultResponseSuccessFuncCB     Result response function callback 
 */
export const responseServiceSuccessGeneratorFuncCB = function* (options) {
    const { response, successFuncCB, resultResponseSuccessFuncCB } = options;
    let result = (response && response.data) ? response.data : null;

    if (result && isFunction(resultResponseSuccessFuncCB)) {
        result = resultResponseSuccessFuncCB(result);
    }

    if (isFunction(successFuncCB)) {
        yield call(successFuncCB, result);
    } else {
        console.log("SuccessFuncCB is not a callback");
    }
};

/**
 * Execute error callback
 * 
 * @param {object} error
 *      Error object 
 * @param {function} errorFuncCB
 *       Error function callback
 */
export const responseServiceErrorFuncCB = (options) => {
    let serviceError = true;
    const { error, errorFuncCB, errorResponseErrorFuncCB } = options;

    if (isError(error)) {
        if (error.response) {
            serviceError = error.response.data;

            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log("error.response.data", serviceError);
        } else if (error.request) {
            serviceError = error.request;

            console.log("error.request", serviceError);

        } else {
            serviceError = error.message;

            console.log("error.message", serviceError);
        }

        if (isFunction(errorResponseErrorFuncCB)) {
            serviceError = errorResponseErrorFuncCB(serviceError);
        }
    } else {
        console.log("Is not error object", error);
    }

    if (isFunction(errorFuncCB)) {
        errorFuncCB(serviceError);
    } else {
        console.log("errorFuncCB is not a function");
    }
};

/**
 * Execute error generator callback
 *  
 * @param {object} error
 *      Error object 
 * @param {function} errorFuncCB
 *      Error generator function callback 
 */
export const responseServiceErrorGeneratorFuncCB = function* (options) {
    let serviceError = true;
    const { error, errorFuncCB, errorResponseErrorFuncCB } = options;

    if (isError(error)) {
        if (error.response) {
            serviceError = error.response.data;

            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log("error.response.data", serviceError);
        } else if (error.request) {
            serviceError = error.request;

            console.log("error.request", serviceError);

        } else {
            serviceError = error.message;

            console.log("error.message", serviceError);
        }

        if (isFunction(errorResponseErrorFuncCB)) {
            serviceError = errorResponseErrorFuncCB(serviceError);
        }
    } else {
        console.log("Is not error object", error);
    }

    if (isFunction(errorFuncCB)) {
        yield call(errorFuncCB, serviceError);
    } else {
        console.log("errorFuncCB is not a function");
    }
};

/**
 * Default get service
 *  
 * @param {ServiceParams} serviceParams
 *      A ServiceParams object with properties: 
 *          - request:                          RequestInfo object
 *          - successFuncCB:                    Success callback
 *          - resultResponseSuccessFuncCB:      (optional) Callback for modificate response
 *          - errorFuncCB:                      Error callback
 *          - errorResponseErrorFuncCB:         (optional) Callback for modificate error 
 *          - context:                          Context for callbackse 
 */
export const baseGetService = (serviceParams) => {
    const { request, successFuncCB, errorFuncCB, resultResponseSuccessFuncCB, errorResponseErrorFuncCB } = serviceParams;

    const optionsResponseServiceSuccess = {
        successFuncCB,
        resultResponseSuccessFuncCB
    }

    const optionsResponseServiceError = {
        errorFuncCB,
        errorResponseErrorFuncCB
    }

    const executeService = new Promise(async (resolve, reject) => {
        let response = null;

        try {
            response = await axios.get(request.path, request.config);
        } catch (error) {
            reject(error);
        }

        resolve(response);
    });

    executeService
        .then(response => responseServiceSuccessFuncCB({
            response,
            ...optionsResponseServiceSuccess
        }))
        .catch(error => responseServiceErrorFuncCB({
            error,
            ...optionsResponseServiceError
        }));
}

/**
 * Default get generator func service
 *  
 * @param {ServiceParams} serviceParams
 *      A ServiceParams object with properties: 
 *          - request:                          RequestInfo object
 *          - successFuncCB:                    Success callback
 *          - resultResponseSuccessFuncCB:      (optional) Callback for modificate response
 *          - errorFuncCB:                      Error callback
 *          - errorResponseErrorFuncCB:         (optional) Callback for modificate error 
 *          - context:                          Context for callbackse 
 */
export const baseGetGeneratorFuncService = function* (serviceParams) {
    const { request, successFuncCB, errorFuncCB, resultResponseSuccessFuncCB, errorResponseErrorFuncCB } = serviceParams;

    const optionsResponseServiceSuccess = {
        successFuncCB,
        resultResponseSuccessFuncCB
    }

    const optionsResponseServiceError = {
        errorFuncCB,
        errorResponseErrorFuncCB
    }

    let response = null;

    try {
        response = yield axios.get(request.path, request.config);
        yield call(responseServiceSuccessGeneratorFuncCB, {
            response,
            ...optionsResponseServiceSuccess
        });
    } catch (error) {
        yield call(responseServiceErrorGeneratorFuncCB, {
            error,
            ...optionsResponseServiceError
        });
    }
}

/**
 * Default post service
 * 
 * @param {ServiceParams} serviceParams 
 *     A ServiceParams object with properties:
 *          - request:                          RequestInfo object
 *          - successFuncCB:                    Success callback
 *          - resultResponseSuccessFuncCB:      (optional) Callback for modificate response
 *          - errorFuncCB:                      Error callback
 *          - errorResponseErrorFuncCB:         (optional) Callback for modificate error 
 *          - context:                          Context for callbackse
 * 
 * @see ServiceParams 
 */
export const basePostService = (serviceParams) => {
    const { request, successFuncCB, errorFuncCB, resultResponseSuccessFuncCB, errorResponseErrorFuncCB } = serviceParams;

    const optionsResponseServiceSuccess = {
        successFuncCB,
        resultResponseSuccessFuncCB
    }

    const optionsResponseServiceError = {
        errorFuncCB,
        errorResponseErrorFuncCB
    }

    const executeService = new Promise(async (resolve, reject) => {
        let response = null;

        try {
            response = await axios.post(request.path, request.body);
        } catch (error) {
            reject(error);
        }

        resolve(response);
    }) 

    executeService
        .then(response => responseServiceSuccessFuncCB({
            response,
            ...optionsResponseServiceSuccess
        }))
        .catch(error => responseServiceErrorFuncCB({
            error,
            ...optionsResponseServiceError
        }));
}

/**
 * Default post service for generator func
 * 
 * @param {ServiceParams} serviceParams 
 *     A ServiceParams object with properties:
 *         - request:                          RequestInfo object
 *          - successFuncCB:                    Success callback
 *          - resultResponseSuccessFuncCB:      (optional) Callback for modificate response
 *          - errorFuncCB:                      Error callback
 *          - errorResponseErrorFuncCB:         (optional) Callback for modificate error 
 *          - context:                          Context for callbackses
 * 
 * @see ServiceParams 
 */
export const basePostGeneratorFuncService = function* (serviceParams) {
    const { request, successFuncCB, errorFuncCB, resultResponseSuccessFuncCB, errorResponseErrorFuncCB } = serviceParams;

    const optionsResponseServiceSuccess = {
        successFuncCB,
        resultResponseSuccessFuncCB
    }

    const optionsResponseServiceError = {
        errorFuncCB,
        errorResponseErrorFuncCB
    } 

    let response = null;

    try {
        response = yield axios.post(request.path, request.body);
        yield call(responseServiceSuccessGeneratorFuncCB, {
            response,
            ...optionsResponseServiceSuccess
        });
    } catch (error) {
        yield call(responseServiceErrorGeneratorFuncCB, {
            error,
            ...optionsResponseServiceError
        });
    }
}