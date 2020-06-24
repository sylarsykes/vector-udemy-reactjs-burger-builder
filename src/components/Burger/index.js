import React from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from "uuid";

import { BurgerIngredientComponent, AVAILABLE_BURGER_INGREDIENT_INGREDIENTS } from './BurgerIngredient';

const BurgerContainer = styled.div`
    width: 100%;
    margin: auto;
    height: 250px;
    overflow: scroll;
    text-align: center;
    font-weight: bold;
    font-size: 1.2rem;

    @media (min-width: 500px) and (min-height: 400px) {
        width: 350px;
        height: 300px;
    }

    @media (min-width: 500px) and (min-height: 401px) {
        width: 450px;
        height: 400px;
    }

    @media (min-width: 1000px) and (min-height: 700px) {
        width: 450px
        height: 400px;
    }
`;

/**
 * Burger component
 * 
 * @param {*} props
 *      Structure with props:
 *          * ingredients List objets with bruger ingredients 
 */
const Burger = (props) => {
    const transformedIngredients = [];

    props.ingredients.forEach((ingredient) => {
        const transformedIngredient = [];

        if (ingredient.burgerIngredient && ingredient.count) {
            for (let index = 0; index < ingredient.count; index++) {
                transformedIngredient.push(
                    <BurgerIngredientComponent 
                        key={uuidv4()} 
                        burgerIngredient={ingredient.burgerIngredient} 
                        type={ingredient.burgerIngredient.type} />
                );
            }

            transformedIngredients.push(transformedIngredient);
        } 
    });

    if (transformedIngredients.length === 0) {
        transformedIngredients.push(<p key={uuidv4()}>Please start adding ingredients!</p>);
    }

    return (
        <BurgerContainer>
            <BurgerIngredientComponent key={uuidv4()} burgerIngredient={ AVAILABLE_BURGER_INGREDIENT_INGREDIENTS.BREAD_TOP } type={ AVAILABLE_BURGER_INGREDIENT_INGREDIENTS.BREAD_TOP.type } />
            {transformedIngredients}
            <BurgerIngredientComponent key={uuidv4()} burgerIngredient={ AVAILABLE_BURGER_INGREDIENT_INGREDIENTS.BREAD_BOTTOM } type={ AVAILABLE_BURGER_INGREDIENT_INGREDIENTS.BREAD_BOTTOM.type }  />
        </BurgerContainer>
    );
};

export default Burger;