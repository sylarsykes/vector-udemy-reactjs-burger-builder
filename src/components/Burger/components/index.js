import React from 'react';
import { v4 as uuidv4 } from "uuid";

import { BurgerContainer } from '../styles';

import { 
    BurgerIngredientComponent, 
    AVAILABLE_BURGER_INGREDIENT_INGREDIENTS 
} from '../../';

/**
 * Burger functional component
 * 
 * @param {*} props
 *      Structure with props:
 *          * ingredients List objets with bruger ingredients
 * 
 * @see BurgerIngredientComponent 
 */
const BurgerFC = (props) => {
    const transformedIngredients = [];

    if (props.ingredients && props.ingredients.length) {
        props.ingredients.forEach((ingredient) => {
            const transformedIngredient = [];

            if (ingredient.burgerIngredient && ingredient.count) {
                for (let index = 0; index < ingredient.count; index++) {
                    transformedIngredient.push( <
                        BurgerIngredientComponent key = {
                            uuidv4()
                        }
                        burgerIngredient = {
                            ingredient.burgerIngredient
                        }
                        type = {
                            ingredient.burgerIngredient.type
                        }
                        />
                    );
                }

                transformedIngredients.push(transformedIngredient);
            }
        });
    }
    

    if (transformedIngredients.length === 0) {
        transformedIngredients.push(<p key={uuidv4()}>Please start adding ingredients!</p>);
    }

    return (
        <BurgerContainer>
            <BurgerIngredientComponent 
                key={uuidv4()} 
                burgerIngredient={ AVAILABLE_BURGER_INGREDIENT_INGREDIENTS.BREAD_TOP } 
                type={ AVAILABLE_BURGER_INGREDIENT_INGREDIENTS.BREAD_TOP.type } />
            {transformedIngredients}
            <BurgerIngredientComponent 
                key={uuidv4()} 
                burgerIngredient={ AVAILABLE_BURGER_INGREDIENT_INGREDIENTS.BREAD_BOTTOM } 
                type={ AVAILABLE_BURGER_INGREDIENT_INGREDIENTS.BREAD_BOTTOM.type }  />
        </BurgerContainer>
    );
};

export default BurgerFC;