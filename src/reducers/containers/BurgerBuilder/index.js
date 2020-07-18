import { 
    ADD_INGREDIENT, REMOVE_INGREDIENT, FETCH_INGREDIENTS_FAILED,
    SET_INGREDIENTS, CALCULATE_TOTAL_PRICE
} from '../../../actions';
import { AVAILABLE_BURGER_INGREDIENT_INGREDIENTS } from '../../../components/constants';
import { updateObject } from '../../../components/utils';
import _ from 'lodash';

/**
 * Inital state
 */
const burgerBuilderInitialState = {
    // Available ingredients
    ingredients: [
        {
            burgerIngredient: AVAILABLE_BURGER_INGREDIENT_INGREDIENTS.PICKLES,
            count: 0
        },
        {
            burgerIngredient: AVAILABLE_BURGER_INGREDIENT_INGREDIENTS.BACON,
            count: 0
        },
        {
            burgerIngredient: AVAILABLE_BURGER_INGREDIENT_INGREDIENTS.SALAD,
            count: 0
        },
        {
            burgerIngredient: AVAILABLE_BURGER_INGREDIENT_INGREDIENTS.CHEESE,
            count: 0
        },
        {
            burgerIngredient: AVAILABLE_BURGER_INGREDIENT_INGREDIENTS.MEAT,
            count: 0
        }
    ],
    // Burger price
    totalPrice: 4,
    error: false 
};

/**
 * Add ingredients in state
 * 
 * @param {*} state
 *      Object with state ingredients 
 * @param {*} action
 *      Object with action and parameters
 */
const addIngredient = (state, action) => {
    const ingredients = state.ingredients;
    const currentStateIngredient = _.find(ingredients, (ingredient) => ingredient.burgerIngredient === action.burgerIngredient);

    const currentStateIngredientIndex = _.findIndex(ingredients, (ingredient) => ingredient.burgerIngredient === action.burgerIngredient);
    
    if (currentStateIngredient) {
        const oldCount = currentStateIngredient.count;
        const updatedCount = oldCount + 1;
        const updatedIngredients = ingredients;

        if (currentStateIngredientIndex !== -1) {
            updatedIngredients[currentStateIngredientIndex].count = updatedCount;

            const priceAddition = currentStateIngredient.burgerIngredient.price;
            const oldTotalPrice = state.totalPrice;
            const updatedToltalPrice = oldTotalPrice + priceAddition;

            const updatedState = updateObject(state, {
                ingredients: updatedIngredients,
            });
        
            return calculateTotalPrice(updatedState, { price: updatedToltalPrice, digit: 2}); 
        }
    }

    return state;
};

/**
 * Reomve ingredients in state
 * 
 * @param {*} state
 *      Object with state ingredients 
 * @param {*} action
 *      Object with action and parameters
 */
const removeIngredient = (state, action) => {
    const ingredients = state.ingredients;
    const currentStateIngredient = _.find(ingredients, (ingredient) => ingredient.burgerIngredient === action.burgerIngredient);

    const currentStateIngredientIndex = _.findIndex(ingredients, (ingredient) => ingredient.burgerIngredient === action.burgerIngredient);

    if (currentStateIngredient) {
        const oldCount = currentStateIngredient.count;
        const updatedCount = oldCount - 1;
        const updatedIngredients = ingredients;

        if (currentStateIngredientIndex !== -1) {
            updatedIngredients[currentStateIngredientIndex].count = updatedCount;

            const priceDeduction = currentStateIngredient.burgerIngredient.price;
            const oldTotalPrice = state.totalPrice;
            const updatedToltalPrice = oldTotalPrice - priceDeduction;

            const updatedState = updateObject(state, {
                ingredients: updatedIngredients,
            });
        
            return calculateTotalPrice(updatedState, { price: updatedToltalPrice, digit: 2}); 
        }
    }

    return state;
};

/**
 * Set ingredients in state
 * 
 * @param {*} state
 *      Object with state ingredients 
 * @param {*} action
 *      Object with action and parameters
 */
const setIngredients = (state, action) => updateObject(state, {
    ingredients: action.ingredients,
    totalPrice: 4,
    error: false
});

/**
 * Error callback in fetch ingredients
 * 
 * @param {*} state
 *      Object with state ingredients 
 * @param {*} action
 *      Object with action and parameters
 */
const fetchIngredientsFailed = (state, action) => updateObject(state, {
    error: true
});

/**
 * Update totalPrice
 * 
 * @param {*} state
 *      Object with state ingredients 
 * @param {*} action
 *      Object with action and parameters
 */
const calculateTotalPrice = (state, action) => updateObject(state, {
    totalPrice: _.round(_.toNumber(action.price), action.digit)
});

/**
 * BurgerBuilder reducer
 * 
 * @param {*} state
 *      Object with state ingredients 
 * @param {*} action
 *      Object with action and parameters
 */
export const burgerBuilderReducer = (state = burgerBuilderInitialState, action) => {

    switch (action.type) {
        case ADD_INGREDIENT:
            return addIngredient(state, action);
        case REMOVE_INGREDIENT:
            return removeIngredient(state, action);
        case SET_INGREDIENTS:
            return setIngredients(state, action);
        case FETCH_INGREDIENTS_FAILED:
            return fetchIngredientsFailed(state, action);
        case CALCULATE_TOTAL_PRICE:
            return calculateTotalPrice(state, action);
        default:
            return state;
    }
}
