import { put, call } from 'redux-saga/effects';
import { 
    purchaseBurgerStart, purchaseBurgerSuccess, purchaseBurgerFail,
    fetchOrdersStart, fetchOrdersSuccess, fetchOrdersFail 
} from '../../../actions/containers/Orders';
import { 
    orderSummaryCreateGeneratorFuncService, orderSummaryFindAllGeneratorFuncService 
} from '../../../services/Orders';

export function* purchaseBurgerSaga(action) {
    yield put(purchaseBurgerStart());

    const options = {
        body: action.orderData,
        token: action.token,
        successFuncCB: function* (result) {
            yield put(purchaseBurgerSuccess(result));
        },
        errorFuncCB: function* (error) {
            yield put(purchaseBurgerFail(error));
        }
    };

    yield call(orderSummaryCreateGeneratorFuncService, options);
}

export function* fetchOrdersSaga(action) {
    yield put(fetchOrdersStart());

    const options = {
        authenticatedUser: action.authenticatedUser,
        successFuncCB: function* (results) {
            if (results && results.length) {
                const orders = yield results.sort((a, b) => a.createDate > b.createDate).map((order) => order);

                yield put(fetchOrdersSuccess(orders));
            }
        },
        errorFuncCB: function* (error) {
            yield put(fetchOrdersFail(error));
        }
    }

    yield call(orderSummaryFindAllGeneratorFuncService, options);
}