import { call } from 'redux-saga/effects';
import { isEmpty, map } from 'lodash';
import { 
    baseGetService, baseGetGeneratorFuncService, ServiceParamsBuilder
} from '../../Common';
import { COUNTRIES_BASE_URL, CountriesModel  } from '../../../api/Countries';

const COUNTRIES_FIND_ALL_PATH = COUNTRIES_BASE_URL + 'all';

/**
 * Find all service
 * 
 * @param {object} options
 *      Properties
 *          -   builderModelFuncCB (optional)
 *          -   successFuncCB
 *          -   errorFuncCB
 */
export const countriesFindAllService = (options) => {
    const { successFuncCB, errorFuncCB } = options;

    const builderModelFuncCB = (restCountryProperties) => CountriesModel.mapperBuild(restCountryProperties);
    const resultResponseSuccessFuncCB = (response) => {
        let result = null;

        if (response && response.data) {
            const data = response.data;

            result = builderModelFuncCB(data)
        }

        return result;
    }

    const serviceParams = new ServiceParamsBuilder()
        .setRequest({
            path: COUNTRIES_FIND_ALL_PATH,
        })
        .setSuccessFuncCB(successFuncCB)
        .setResultResponseSuccessFuncCB(resultResponseSuccessFuncCB)
        .setErrorFuncCB(errorFuncCB)
        .build();

    baseGetService(serviceParams); 
};

/**
 * Find all service
 * 
 * @param {object} options
 *      Properties
 *          -   builderModelFuncCB (optional)
 *          -   successFuncCB
 *          -   errorFuncCB
 */
export const countriesFindAllGeneratorFuncService = function* (options) {
    const { successFuncCB, errorFuncCB } = options;

    const builderModelFuncCB = (restCountryProperties) => CountriesModel.mapperBuild(restCountryProperties);
    const resultResponseSuccessFuncCB = (response) => {
        let countries = null;

        if (response && !isEmpty(response)) {
            countries = map(response, (country) => builderModelFuncCB(country));
        }

        return countries;
    }

    const serviceParams = yield new ServiceParamsBuilder()
        .setRequest({
            path: COUNTRIES_FIND_ALL_PATH,
        })
        .setSuccessFuncCB(successFuncCB)
        .setResultResponseSuccessFuncCB(resultResponseSuccessFuncCB)
        .setErrorFuncCB(errorFuncCB)
        .build();
    
    yield call(baseGetGeneratorFuncService, serviceParams); 
};