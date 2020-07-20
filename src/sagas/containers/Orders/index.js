import { put, call } from 'redux-saga/effects';
import { 
    purchaseBurgerStart, purchaseBurgerSuccess, purchaseBurgerFail,
    fetchOrdersStart, fetchOrdersSuccess, fetchOrdersFail 
} from '../../../actions';
import { orderSummaryCreateGeneratorFuncService, orderSummaryFindAllGeneratorFuncService } from '../../../components/services'

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
        token: action.token,
        userId: action.userId,
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