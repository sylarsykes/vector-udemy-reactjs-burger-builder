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
    });

    const postServiceErrorFuncCB = (error, errorFuncCB) => {
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

    executeService
        .then(response => {
            let result = null;

            if (response && response.data) {
                result = response.data;
            }
            
            successFuncCB(result);
        })
        .catch(error => postServiceErrorFuncCB(error, errorFuncCB));
}

export default basePostService;