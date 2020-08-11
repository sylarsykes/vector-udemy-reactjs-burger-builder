import { map, keys } from 'lodash';
import { call } from 'redux-saga/effects';
import { BASE_URL }  from '../../../../config/axios';
import { baseGetService, baseGetGeneratorFuncService } from '../default';

/**
 * Default find all service
 * 
 * @param {FindServiceParams} serviceParams 
 *     A FindServiceParams object with properties:
 *          - request:               RequestInfo object
 *          - successFuncCB:         Success callback
 *          - errorFuncCB:           Error callback
 *          - builderModelFuncCB:    Builder callback
 *          - context:               Context for callbacks
 * 
 * @see FindServiceParams
 * @see https://console.firebase.google.com/u/0/project/vector-udemy-burger-builder/database/vector-udemy-burger-builder/rules
 */
export const baseFindAllService = (serviceParams) => {
    const { request, builderModelFuncCB } = serviceParams;
    
    const resultResponseSuccessFuncCB = (response) => {
        let results = [];

        if (response && response.data) {
            const data = response.data;
            
            results = map(keys(data), function(id) {
                const result = data[id];

                return (builderModelFuncCB) ? builderModelFuncCB(id, result) : result;
            }); 
        }

        return results;
    }

    request.path = BASE_URL + request.path;

    serviceParams.request = request;
    serviceParams.resultResponseSuccessFuncCB = resultResponseSuccessFuncCB;

    baseGetService(serviceParams);
};

/**
 * Default find all service
 * 
 * @param {FindServiceParams} serviceParams 
 *     A FindServiceParams object with properties:
 *          - request:               RequestInfo object
 *          - successFuncCB:         Success callback
 *          - errorFuncCB:           Error callback
 *          - builderModelFuncCB:    Builder callback
 *          - context:               Context for callbacks
 * 
 * @see FindServiceParams
 * @see https://console.firebase.google.com/u/0/project/vector-udemy-burger-builder/database/vector-udemy-burger-builder/rules
 */
export const baseFindAllGeneratorFuncService = function* (serviceParams) {
    const { request, builderModelFuncCB } = serviceParams;
    
    const resultResponseSuccessFuncCB = (response) => {
        let results = [];

        if (response && response.data) {
            const data = response.data;
            
            results = map(keys(data), function(id) {
                const result = data[id];
                
                return (builderModelFuncCB) ? builderModelFuncCB(id, result) : result;
            }); 
        }

        return results;
    }

    request.path = BASE_URL + request.path;

    serviceParams.request = request;
    serviceParams.resultResponseSuccessFuncCB = resultResponseSuccessFuncCB;

    yield call(baseGetGeneratorFuncService, serviceParams);
}

/**
 * Default find all service
 * 
 * @param {FindServiceParams} request 
 *     A FindServiceParams object with properties:
 *          - request:               RequestInfo object
 *          - successFuncCB:         Success callback
 *          - errorFuncCB:           Error callback
 *          - builderModelFuncCB:    Builder callback
 *          - params:                Object with extra properties
 *          - context:               Context for callbackse
 */
export const baseFindByIdService = (serviceParams) => {
    const { request, builderModelFuncCB, params } = serviceParams;
    
    const resultResponseSuccessFuncCB = (response) => {
        let result = null;

        if (response && response.data) {
            const data = response.data;

            result = (builderModelFuncCB) ? builderModelFuncCB(params.id, data) : data;
        }

        return result;
    }

    request.path = BASE_URL + request.path;

    serviceParams.request = request;
    serviceParams.resultResponseSuccessFuncCB = resultResponseSuccessFuncCB;

    baseGetService(serviceParams);
};