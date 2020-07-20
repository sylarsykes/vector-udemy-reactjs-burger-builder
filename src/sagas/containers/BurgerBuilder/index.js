import { put, call } from 'redux-saga/effects';
import { 
    setIngredients, fetchIngredientsFailed
} from '../../../actions';
import { burgerIngredientFindAllGeneratorFuncService } from '../../../components/services';

export function* initIngredientsSaga(action) {
    const options = {
        successFuncCB: function* (results) {
            if (results && results.length) {
                const ingredients = yield results.sort((a, b) => a.position > b.position).map((burgerIngredient) => {
                    return {
                        burgerIngredient: burgerIngredient,
                        count: 0
                    }
                });

                yield put(setIngredients(ingredients));
            } 
        },
        errorFuncCB: function* (error) {
            yield put(fetchIngredientsFailed());
        }
    };

    yield call(burgerIngredientFindAllGeneratorFuncService, options);
}

