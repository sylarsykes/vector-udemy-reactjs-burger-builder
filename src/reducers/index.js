import { ADD_INGREDIENT, REMOVE_INGREDIENT } from '../actions';
import { AVAILABLE_BURGER_INGREDIENT_INGREDIENTS } from '../components/constants';

const initialState = {
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
};

const INGREDIENT_PRICES = [
    {
        burgerIngredient: AVAILABLE_BURGER_INGREDIENT_INGREDIENTS.PICKLES,
        price: 0.3
    },
    {
        burgerIngredient: AVAILABLE_BURGER_INGREDIENT_INGREDIENTS.BACON,
        price: 0.5
    },
    {
        burgerIngredient: AVAILABLE_BURGER_INGREDIENT_INGREDIENTS.SALAD,
        price: 0.5
    },
    {
        burgerIngredient: AVAILABLE_BURGER_INGREDIENT_INGREDIENTS.CHEESE,
        price: 0.4
    },
    {
        burgerIngredient: AVAILABLE_BURGER_INGREDIENT_INGREDIENTS.MEAT,
        price: 1
    }
];

/**
 * Find ingredient by burgerIngredient
 * 
 * @param {*} burgerIngredient Available burger ingredient
 */
const _findStateIngredientByType = (constant, burgerIngredient) => constant.find((ingredient) => ingredient.burgerIngredient === burgerIngredient);

/**
 * Find ingredient index by type
 * 
 * @param {*} burgerIngredient Available burger ingredient 
 */
const _findStateIngredientIndexByType = (constant, burgerIngredient) => constant.findIndex((ingredient) => ingredient.burgerIngredient === burgerIngredient);

const reducer = ( state = initialState, action ) => {
    const ingredients = state.ingredients;
    const currentStateIngredient = _findStateIngredientByType(ingredients, action.burgerIngredient);

    const currentStateIngredientIndex = _findStateIngredientIndexByType(ingredients, action.burgerIngredient);

    switch (action.type) {
        case ADD_INGREDIENT:

            if (currentStateIngredient) {
                const oldCount = currentStateIngredient.count;
                const updatedCount = oldCount + 1;
                const updatedIngredients = ingredients;

                if (currentStateIngredientIndex !== -1) {
                    updatedIngredients[currentStateIngredientIndex].count = updatedCount;

                    const priceAddition = INGREDIENT_PRICES[currentStateIngredientIndex].price;
                    const oldTotalPrice = state.totalPrice;
                    const updatedToltalPrice = oldTotalPrice + priceAddition;

                    return {
                        ...state,
                        ingredients: updatedIngredients,
                        totalPrice: updatedToltalPrice
                    }
                }
            }

            return state;
        case REMOVE_INGREDIENT:
            if (currentStateIngredient) {
                const oldCount = currentStateIngredient.count;
                const updatedCount = oldCount - 1;
                const updatedIngredients = ingredients;

                if (currentStateIngredientIndex !== -1) {
                    updatedIngredients[currentStateIngredientIndex].count = updatedCount;

                    const priceDeduction = INGREDIENT_PRICES[currentStateIngredientIndex].price;
                    const oldTotalPrice = state.totalPrice;
                    const updatedToltalPrice = oldTotalPrice - priceDeduction;

                    return {
                        ...state,
                        ingredients: updatedIngredients,
                        totalPrice: updatedToltalPrice
                    }
                }
            }

            return state;
        default:
            return state;
    }
};

export default reducer;
export { initialState };