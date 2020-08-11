import React from 'react';
import { OrderContainer, OrderIngredientSpanContainer} from '../styles';
import { isEmpty } from 'lodash';

/**
 * Order functional component
 * 
 * @param {object} props
 *      Json object with properties:
 *          -   ingredients
 *          -   price 
 */
export const OrderFC = (props) => {
    const { ingredients, price } = props;

    const ingredientOutput = (ingredients && !isEmpty(ingredients)) ? ingredients.map(ingredient => {
        return <OrderIngredientSpanContainer
            key={ingredient.label}>
                {ingredient.label} ({ingredient.amount})
            </OrderIngredientSpanContainer>;
    }) : '';

    return (
        <OrderContainer>
            <p>Ingredients: {ingredientOutput}</p>
            <p>Price: <strong>USD { price }</strong></p>
        </OrderContainer>
    )
};