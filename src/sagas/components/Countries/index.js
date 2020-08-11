import { put, call } from 'redux-saga/effects';
import { 
    fetchCountriesStart, fetchCountriesSuccess, fetchCountriesFail 
} from '../../../actions/components/Countries';
import { countriesFindAllGeneratorFuncService } from '../../../services/Countries';

/**
 * Fetch countries
 * 
 * @param {*} action 
 */
export function* fetchCountriesSaga(action) {
    yield put(fetchCountriesStart());

    const options = {
        authenticatedUser: action.authenticatedUser,
        successFuncCB: function* (results) {
            yield put(fetchCountriesSuccess(results));
        },
        errorFuncCB: function* (error) {
            yield put(fetchCountriesFail(error));
        }
    }

    yield call(countriesFindAllGeneratorFuncService, options);

}