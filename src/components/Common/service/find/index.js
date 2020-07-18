import axios, { BASE_URL } from '../../../../../config/axios';

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
    const { request, successFuncCB, errorFuncCB, builderModelFuncCB } = serviceParams

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
            const results = [];

            if (response && response.data) {
                const data = response.data;
            
                Object.keys(data).forEach((id) => {
                    const result = data[id];
                    
                    const resultObject = (builderModelFuncCB) ? builderModelFuncCB(id, result) : result;

                    results.push(resultObject);
                }); 
            }

            successFuncCB(results);
        })
        .catch(error => {
            errorFuncCB({ error: error });
        });
};

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
        .catch(error => {
            errorFuncCB({ error: error });
        }); 
};

export { baseFindAllService, baseFindByIdService };