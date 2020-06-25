import axios, { BASE_URL } from '../../../../../config/axios';

/**
 * Default find all service
 * 
 * @param {*} request 
 *      An object with the structure:
 *          path: Path to service
 *          builderModelFuncCB: Callback for create object result
 *          successFuncCB: Success callback to execute
 *          errorFuncCB: Error callback to execute
 */
const baseFindAllService = (request) => {

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
        .then(response => {
            const successFuncCB = request.successFuncCB;

            if (response && response.data) {
                const data = response.data;
                const results = [];

                Object.keys(data).forEach((id) => {
                    const result = data[id];
                    const builderModelFuncCB = request.builderModelFuncCB;
                    const resultObject = builderModelFuncCB(id, result);

                    results.push(resultObject);
                });
                
                successFuncCB({ loading: false, error: false, results: results });
            } else {
                successFuncCB({ loading: false, error: false, results: [] });
            }
        })
        .catch(error => {
            const errorFuncCB = request.errorFuncCB; 
            errorFuncCB({ loading: false, error: true });
        });
};

export { baseFindAllService };