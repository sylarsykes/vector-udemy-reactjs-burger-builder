import React from 'react';
import { OrderContainer, OrderIngredientSpanContainer} from '../styles';

/**
 * Order functional component
 * 
 * @param {*} props 
 */
const OrderFC = (props) => {

    const ingredientOutput = props.ingredients.map(ingredient => {
        return <OrderIngredientSpanContainer
            key={ingredient.label}>
                {ingredient.label} ({ingredient.amount})
            </OrderIngredientSpanContainer>;
    });

    return (
        <OrderContainer>
            <p>Ingredients: {ingredientOutput}</p>
            <p>Price: <strong>USD { Number.parseFloat(props.price).toFixed(2) }</strong></p>
        </OrderContainer>
    )
};

export default OrderFC;