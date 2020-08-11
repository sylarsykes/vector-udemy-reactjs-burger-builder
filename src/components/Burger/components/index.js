import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { isEmpty, forEach } from 'lodash';
import { BurgerContainer } from '../styles';
import { AVAILABLE_BURGER_INGREDIENT_INGREDIENTS } from '../../constants';
import { BurgerIngredientComponent } from '../../components';

/**
 * Render a list of ingredients
 * 
 * @param {object} props
 *      Json object with properties
 *          -   ingredients 
 */
export const BurgerRenderBurgerIngredientsFC = (props) => {
    const { ingredients } = props;
    const transformedIngredients = [];
    
    if (ingredients && !isEmpty(ingredients)) {
        forEach(ingredients, (ingredient) => {
            const transformedIngredient = [];

            if (ingredient.burgerIngredient && ingredient.count) {
                for (let index = 0; index < ingredient.count; index++) {
                    transformedIngredient.push(<BurgerIngredientComponent 
                            key={uuidv4()} 
                            burgerIngredient={ingredient.burgerIngredient}
                            type={ingredient.burgerIngredient.type}
                        />
                    );
                }

                transformedIngredients.push(transformedIngredient);
            }
        });
    }
    
    if (isEmpty(transformedIngredients)) {
        transformedIngredients.push(<p key={uuidv4()}>Please start adding ingredients!</p>);
    }

    return transformedIngredients;
}

/**
 * Burger functional component
 * 
 * @param {*} props
 *      Structure with props:
 *          * ingredients List objets with bruger ingredients
 * 
 * @see BurgerIngredientComponent 
 */
export const BurgerFC = (props) => (
        <BurgerContainer>
            <BurgerIngredientComponent 
                key={uuidv4()} 
                burgerIngredient={ AVAILABLE_BURGER_INGREDIENT_INGREDIENTS.BREAD_TOP } 
                type={ AVAILABLE_BURGER_INGREDIENT_INGREDIENTS.BREAD_TOP.type } />
            <BurgerRenderBurgerIngredientsFC ingredients={props.ingredients} />
            <BurgerIngredientComponent 
                key={uuidv4()} 
                burgerIngredient={ AVAILABLE_BURGER_INGREDIENT_INGREDIENTS.BREAD_BOTTOM } 
                type={ AVAILABLE_BURGER_INGREDIENT_INGREDIENTS.BREAD_BOTTOM.type }  />
        </BurgerContainer>
    );;
