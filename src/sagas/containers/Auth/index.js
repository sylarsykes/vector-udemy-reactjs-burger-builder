import { put, call, delay } from 'redux-saga/effects';
import { usersCreateGeneratorFuncService, usersVerifyGeneratorFuncService } from '../../../components/services';
import { 
    logoutSucceed, logout, authStart,
    authSuccess, checkAuthTimeout, authFail
} from '../../../actions';

const LOCAL_STORATEGE_SET_TOKEN = 'token';
const LOCAL_STORATEGE_SET_EXPIRATION_DATE = 'expirationDate';
const LOCAL_STORAGE_SET_USERID = 'userId';

export function* logoutSaga(action) {
    yield call([localStorage, "removeItem"], LOCAL_STORATEGE_SET_TOKEN);
    yield call([localStorage, "removeItem"], LOCAL_STORATEGE_SET_EXPIRATION_DATE);
    yield call([localStorage, "removeItem"], LOCAL_STORAGE_SET_USERID);
    yield put(logoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
    yield delay(action.expirationTime * 1000);
    yield put(logout());
}

export function* authUserSaga(action) {
    yield put(authStart());

    const options = {
        body: {
            email: action.email,
            password: action.password,
            returnSecureToken: true
        },
        successFuncCB: function* (result) {
            yield call(function* (result) {
                const expirationDate = yield new Date(new Date().getTime() + result.expiresIn * 1000);

                yield localStorage.setItem(LOCAL_STORATEGE_SET_TOKEN, result.idToken);
                yield localStorage.setItem(LOCAL_STORATEGE_SET_EXPIRATION_DATE, expirationDate);
                yield localStorage.setItem(LOCAL_STORAGE_SET_USERID, result.localId);

                yield put(authSuccess(result.idToken, result.localId));
                yield put(checkAuthTimeout(result.expiresIn));
            }, result);
        },
        errorFuncCB: function* (error) {
            yield put(authFail(error.error));
        }
    };

    if (!action.isSignup) {
        yield call(usersVerifyGeneratorFuncService, options);
    } else {
        yield call(usersCreateGeneratorFuncService, options);
    }
}

export function* authCheckStateSaga(action) {
    const token = yield localStorage.getItem("token");
    if (!token) {
        yield put(logout());
    } else {
        const expirationDate = yield new Date(
            localStorage.getItem("expirationDate")
        );
        if (expirationDate <= new Date()) {
            yield put(logout());
        } else {
            const userId = yield localStorage.getItem("userId");
            yield put(authSuccess(token, userId));
            yield put(checkAuthTimeout(
                    (expirationDate.getTime() - new Date().getTime()) / 1000
                )
            );
        }
    }
}