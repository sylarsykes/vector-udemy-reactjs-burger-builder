import axios from '../../../../../config/axios';

const baseCreateService = (request) => {
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
        .then(response => {
            const successFuncCB = request.successFuncCB;
            let result = null;

            if (response && response.data) {
                const data = response.data;
                console.log(data);

                Object.keys(data).forEach((id) => {
                    const r = data[id];
                    const builderModelFuncCB = request.builderModelFuncCB;
                    result = (builderModelFuncCB) ? builderModelFuncCB(id, r) : r;
                });
            }
            
            successFuncCB({ result: result });
        })
        .catch(error => {
            const errorFuncCB = request.errorFuncCB; 
            errorFuncCB({ error: true });
        });
}

export default baseCreateService;