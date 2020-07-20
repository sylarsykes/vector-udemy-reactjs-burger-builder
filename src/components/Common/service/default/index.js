import axios from '../../../../../config/axios';
import { call } from "redux-saga/effects";

/**
 * Execute success callback
 *  
 * @param {object} response
 *      Response object 
 * @param {function} successFuncCB
 *      Success function callback 
 */
const responseServiceSuccessFuncCB = (response, successFuncCB) => {
    let result = null;

    if (response && response.data) {
        result = response.data;
    }

    successFuncCB(result);
}

/**
 * Execute success generator callback
 * 
 * @param {object} response
 *      Response object 
 * @param {function} successFuncCB
 *      Success generator function callback 
 */
const responseServiceSuccessGeneratorFuncCB = function* (response, successFuncCB) {
    let result = null;

    if (response && response.data) {
        result = response.data;
    }

    yield call(successFuncCB, result);
};

/**
 * Execute error callback
 * 
 * @param {object} error
 *      Error object 
 * @param {function} errorFuncCB
 *       Error function callback
 */
const responseServiceErrorFuncCB = (error, errorFuncCB) => {
    let serviceError = true;

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

    errorFuncCB(serviceError);
};

/**
 * Execute error generator callback
 *  
 * @param {object} error
 *      Error object 
 * @param {function} errorFuncCB
 *      Error generator function callback 
 */
const responseServiceErrorGeneratorFuncCB = function* (error, errorFuncCB) {
    let serviceError = true;

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

    yield call(errorFuncCB, serviceError);
};

/**
 * Default post service
 * 
 * @param {ServiceParams} serviceParams 
 *     A ServiceParams object with properties:
 *          - request   RequestInfo object
 *          - successFuncCB Success callback
 *          - errorFuncCB Error callback
 *          - context   Context for callbacks
 * 
 * @see ServiceParams 
 */
const basePostService = (serviceParams) => {
    const { request, successFuncCB, errorFuncCB } = serviceParams;

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
        .then(response => responseServiceSuccessFuncCB(response, successFuncCB))
        .catch(error => responseServiceErrorFuncCB(error, errorFuncCB));
}

/**
 * Default post service for generator func
 * 
 * @param {ServiceParams} serviceParams 
 *     A ServiceParams object with properties:
 *          - request   RequestInfo object
 *          - successFuncCB Generator func success callback
 *          - errorFuncCB Generator func error callback
 *          - context   Context for callbacks
 * 
 * @see ServiceParams 
 */
const basePostGeneratorFuncService = function* (serviceParams) {
    const { request, successFuncCB, errorFuncCB } = serviceParams;

    let response = null;

    try {
        response = yield axios.post(request.path, request.body);
        yield call(responseServiceSuccessGeneratorFuncCB, response, successFuncCB);
    } catch (error) {
        yield call(responseServiceErrorGeneratorFuncCB, error, errorFuncCB);
    }
}

export {
    responseServiceSuccessFuncCB, responseServiceSuccessGeneratorFuncCB,
    responseServiceErrorFuncCB, responseServiceErrorGeneratorFuncCB, 
    basePostService, basePostGeneratorFuncService 
};