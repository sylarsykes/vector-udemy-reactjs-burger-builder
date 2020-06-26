import axios from '../../../../../config/axios';

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
        .then(response => {
            let result = null;

            if (response && response.data) {
                const data = response.data;

                result = {
                    id: data.name
                }
            }
            
            successFuncCB(result);
        })
        .catch(error => errorFuncCB({ error: true }) );
}

export default baseCreateService;