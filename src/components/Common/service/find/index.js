import _ from 'lodash';
import { call } from 'redux-saga/effects';
import axios, { BASE_URL } from '../../../../../config/axios';
import { responseServiceErrorFuncCB, responseServiceErrorGeneratorFuncCB } from '../default';

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
const baseFindAllService = (serviceParams) => {
    const { request, successFuncCB, errorFuncCB, builderModelFuncCB } = serviceParams;

    const executeService = new Promise(async (resolve, reject) => {
        let response = null;

        try {
            response = await axios.get(BASE_URL + request.path, request.config);
        } catch (error) {          
            reject(error);
        }

        resolve(response);
    });

    executeService
        .then(response => {     
            let results = [];

            if (response && response.data) {
                const data = response.data;
                
                results = _.map(_.keys(data), function(id) {
                    const result = data[id];

                    return (builderModelFuncCB) ? builderModelFuncCB(id, result) : result;
                }); 
            }

            successFuncCB(results);
        })
        .catch(error => responseServiceErrorFuncCB({ response: { data: { error: error }}}, errorFuncCB));
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
const baseFindAllGeneratorFuncService = function* (serviceParams) {
    const { request, successFuncCB, errorFuncCB, builderModelFuncCB } = serviceParams;

    let response = null;

    try {
        response = yield axios.get(BASE_URL + request.path, request.config);

        if (response && response.data) {
            const data = response.data;

            const results = _.map(_.keys(data), function (id) {
                const result = data[id];
                let r = result;
                
                if (builderModelFuncCB) {
                    r = builderModelFuncCB(id, result);
                }
                
                return r;
            });

            yield call(successFuncCB, results);
        }

    } catch (error) {
        yield call(responseServiceErrorGeneratorFuncCB, { response: { data: { error: error }}}, errorFuncCB);
    }
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
const baseFindByIdService = (serviceParams) => {
    const { request, successFuncCB, errorFuncCB, builderModelFuncCB, params } = serviceParams;

    const executeService = new Promise(async (resolve, reject) => {
        let response = null;

        try {
            response = await axios.get(BASE_URL + request.path);
        } catch (error) {
            reject(error);
        }

        resolve(response);
    });

    executeService
        .then(response => {;
            let result = null;

            if (response && response.data) {
                const data = response.data;

                result = (builderModelFuncCB) ? builderModelFuncCB(params.id, data) : data;
            }

            successFuncCB(result);
        })
        .catch(error => responseServiceErrorFuncCB({ response: { data: { error: error }}}, errorFuncCB));
};

export { 
    baseFindAllService, baseFindAllGeneratorFuncService, baseFindByIdService 
};