const INIT_INGREDIENTS = 'INIT_INGREDIENTS';
const ADD_INGREDIENT = 'ADD_INGREDIENT';
const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';
const SET_INGREDIENTS = 'SET_INGREDIENTS';
const FETCH_INGREDIENTS_FAILED = 'FETCH_INGREDIENTS_FAILED';
const CALCULATE_TOTAL_PRICE = 'CALCULATE_TOTAL_PRICE';

/**
 * Add ingredient action
 *  
 * @param {object} burgerIngredient
 *      Object burgerIngredient for add 
 */
const addIngredient = (burgerIngredient) => {
    return {
        type: ADD_INGREDIENT,
        burgerIngredient
    };
};

/**
 * Remove ingredient action
 * 
 * @param {object} burgerIngredient
 *      Object burgerIngredient for remove 
 */
const removeIngredient = (burgerIngredient) => {
    return {
        type: REMOVE_INGREDIENT,
        burgerIngredient
    };
};

/**
 * Set ingredients action
 * 
 * @param {Array} ingredients
 *      List of ingredients to set 
 */
const setIngredients = (ingredients) => {
    return {
        type: SET_INGREDIENTS,
        ingredients
    };
};

/**
 * Error fetch action 
 */
const fetchIngredientsFailed = () => {
    return {
        type: FETCH_INGREDIENTS_FAILED
    };
};

/**
 * Init ingredients action
 * Fetch ingredientes
 */
const initIngridients = () => {
    return {
        type: INIT_INGREDIENTS
    }
};

/**
 * Calculate total price action
 *  
 * @param {number} totalPrice 
 */
const calculateTotalPrice = (totalPrice) => {
    return {
        type: CALCULATE_TOTAL_PRICE,
        totalPrice
    }
};

export {
    // CONSTANTS
    INIT_INGREDIENTS, ADD_INGREDIENT, REMOVE_INGREDIENT, SET_INGREDIENTS,
    FETCH_INGREDIENTS_FAILED, CALCULATE_TOTAL_PRICE, 
    // ACTIONS
    addIngredient, removeIngredient, setIngredients,
    fetchIngredientsFailed, initIngridients, calculateTotalPrice
};