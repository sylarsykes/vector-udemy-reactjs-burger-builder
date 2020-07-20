import axios from '../../../../../config/axios';
import { 
    responseServiceSuccessFuncCB, responseServiceErrorFuncCB,
    responseServiceSuccessGeneratorFuncCB, responseServiceErrorGeneratorFuncCB 
} from '../default';
import { call } from 'redux-saga/effects';

/**
 * Create service
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
const baseCreateService = (serviceParams) => {
    const { request, successFuncCB, errorFuncCB } = serviceParams;

    const executeService = new Promise(async (resolve, reject) => {
        let response = null;

        try {
            response = await axios.post(request.path, request.body);
        } catch (error) {
            reject(error);
        }

        resolve(response);
    });

    executeService
        .then(response => responseServiceSuccessFuncCB(response, successFuncCB))
        .catch(error => responseServiceErrorFuncCB({response: { data: { error: true }}}, errorFuncCB));
}

/**
 * Create service generator func
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
const baseCreateGeneratorFuncService = function* (serviceParams) {
    const { request, successFuncCB, errorFuncCB } = serviceParams;
    
    let response = null;

    try {
        response = yield axios.post(request.path, request.body);
        yield call(responseServiceSuccessGeneratorFuncCB, response, successFuncCB);
    } catch (error) {
        yield call(responseServiceErrorGeneratorFuncCB, {response: { data: { error: true }}}, errorFuncCB);
    } 
}

export { baseCreateService, baseCreateGeneratorFuncService };