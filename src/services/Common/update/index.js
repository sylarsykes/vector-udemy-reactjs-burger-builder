import axios from '../../../../config/axios';
import { responseServiceSuccessFuncCB, responseServiceErrorFuncCB } from '../default';

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
const baseUpdateService = (serviceParams) => {
    const { request, successFuncCB, errorFuncCB } = serviceParams;

    const executeService = new Promise(async (resolve, reject) => {
        let response = null;

        try {
            response = await axios.put(request.path, request.body);
        } catch (error) {
            reject(error);
        }

        resolve(response);
    });

    executeService
        .then(response => responseServiceSuccessFuncCB(response, successFuncCB))
        .catch(error => responseServiceErrorFuncCB({response: { data: { error: true }}}, errorFuncCB));
}

export default baseUpdateService;