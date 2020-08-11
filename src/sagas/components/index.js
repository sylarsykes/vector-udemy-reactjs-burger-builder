import { takeEvery } from 'redux-saga/effects';
import { fetchCountriesSaga } from './Countries';
import { 
    FETCH_COUNTRIES
} from '../../actions';

export function* watchCountries() {
    yield takeEvery(FETCH_COUNTRIES, fetchCountriesSaga);
}

