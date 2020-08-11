// commnand execute node -r esm --experimental-modules ./scripts/customers/index.js
import { basePostService, ServiceParamsBuilder } from '../../../src/services/Common';
import { createDate, createUser } from '../utils';
import { CUSTOMERS_BASE_URL } from '../../../src/api/Customers';

const customers = [
    {
        name: 'Juan',
        surname: 'Gonzalez Fernandez',
        email: 'jgonzalezfe@vectoritcgroup.com',
        age: 32,
        phoneNumber: '+34 666090822',
        adresses: [
            {
                street: 'Avda. Arteixo, 118, 7B',
                city: 'A Coruña',
                state: 'A Coruña',
                postalCode: 15008,
                country: 'ESP',
                createDate,
                createUser,
                updateDate: null,
                updateUser: null,
                removeDate: null,
                removeUser: null
            }
        ],
        createDate,
        createUser,
        updateDate: null,
        updateUser: null,
        removeDate: null,
        removeUser: null
    }
];

customers.forEach((customer) => {
    const serviceParams = new ServiceParamsBuilder()
        .setRequest({
            path: CUSTOMERS_BASE_URL,
            body: customer
        })
        .setSuccessFuncCB(function(result){})
        .setErrorFuncCB(function(error){})
        .build();
    
    basePostService(serviceParams);
});