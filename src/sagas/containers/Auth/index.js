import { put, call, delay } from 'redux-saga/effects';
import { usersCreateGeneratorFuncService, usersVerifyGeneratorFuncService } from '../../../services/Users';
import { 
    logoutSucceed, logout, authStart,
    authSuccess, checkAuthTimeout, authFail
} from '../../../actions';

const LOCAL_STORATEGE_SET_EXPIRATION_DATE = 'expirationDate';
const LOCAL_STORAGE_SET_AUTHENTICATED_USER = 'authenticatedUser';

export function* logoutSaga(action) {
    yield call([localStorage, "removeItem"], LOCAL_STORATEGE_SET_EXPIRATION_DATE);
    yield call([localStorage, "removeItem"], LOCAL_STORAGE_SET_AUTHENTICATED_USER);
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
                const { authenticatedUser } = result;
                const { expiresIn } = authenticatedUser;

                const expirationDate = yield new Date(new Date().getTime() + expiresIn * 1000);

                yield localStorage.setItem(LOCAL_STORATEGE_SET_EXPIRATION_DATE, expirationDate);
                yield localStorage.setItem(LOCAL_STORAGE_SET_AUTHENTICATED_USER, authenticatedUser);

                yield put(authSuccess(authenticatedUser));
                yield put(checkAuthTimeout(expiresIn));
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
    const authenticatedUser = yield localStorage.getItem(LOCAL_STORAGE_SET_AUTHENTICATED_USER);
    if (!authenticatedUser) {
        yield put(logout());
    } else {
        const expirationDate = yield new Date(
            localStorage.getItem(LOCAL_STORATEGE_SET_EXPIRATION_DATE)
        );
        if (expirationDate <= new Date()) {
            yield put(logout());
        } else {
            yield put(authSuccess(authenticatedUser));
            yield put(checkAuthTimeout(
                    (expirationDate.getTime() - new Date().getTime()) / 1000
                )
            );
        }
    }
}