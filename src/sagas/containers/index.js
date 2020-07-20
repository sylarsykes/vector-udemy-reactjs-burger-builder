import { takeEvery, all, takeLatest } from "redux-saga/effects";
import {
    logoutSaga, checkAuthTimeoutSaga, authUserSaga,
    authCheckStateSaga
} from './Auth';
import { initIngredientsSaga } from './BurgerBuilder';
import {
    purchaseBurgerSaga, fetchOrdersSaga
} from './Orders'
import { 
    AUTH_CHECK_TIMEOUT, AUTH_INITIATE_LOGOUT, AUTH_USER,
    AUTH_CHECK_STATE, INIT_INGREDIENTS, PURCHASE_BURGER, FETCH_ORDERS
} from '../../actions';

export function* watchAuth() {
    yield all([
        takeEvery(AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
        takeEvery(AUTH_INITIATE_LOGOUT, logoutSaga),
        takeEvery(AUTH_USER, authUserSaga),
        takeEvery(AUTH_CHECK_STATE, authCheckStateSaga)
    ]);
}

export function* watchBurgerBuilder() {
    yield takeEvery(INIT_INGREDIENTS, initIngredientsSaga);
}

export function* watchOrder() {
    yield takeLatest(PURCHASE_BURGER, purchaseBurgerSaga);
    yield takeEvery(FETCH_ORDERS, fetchOrdersSaga);
}




