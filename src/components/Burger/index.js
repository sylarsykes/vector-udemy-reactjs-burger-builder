import React from 'react';
import styled from 'styled-components';

import BurgerIngredient, { AVAILABLE_BURGER_INGREDIENT_INGREDIENTS } from './BurgerIngredient';

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
        width: 700px;
        height: 600px;
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

        if (ingredient.type && ingredient.count) {
            for (let index = 0; index < ingredient.count; index++) {
                transformedIngredient.push(<BurgerIngredient key={index} type={ingredient.type} />)
            }

            transformedIngredients.push(transformedIngredient);
        }
    });

    return (
        <BurgerContainer>
            <BurgerIngredient type={ AVAILABLE_BURGER_INGREDIENT_INGREDIENTS.BREAD_TOP } />
            {transformedIngredients}
            <BurgerIngredient type={ AVAILABLE_BURGER_INGREDIENT_INGREDIENTS.BREAD_BOTTOM }  />
        </BurgerContainer>
    );
};

export default Burger;