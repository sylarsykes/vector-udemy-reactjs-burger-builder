import React from 'react';
import styled from 'styled-components';

import { AVAILABLE_BURGER_INGREDIENT_INGREDIENTS, BuildControl, Button,
        AvailableButtons } from '../../';

const controls = [
    { 
        label: AVAILABLE_BURGER_INGREDIENT_INGREDIENTS.PICKLES.label,
        type: AVAILABLE_BURGER_INGREDIENT_INGREDIENTS.PICKLES
    },
    {
        label: AVAILABLE_BURGER_INGREDIENT_INGREDIENTS.BACON.label,
        type: AVAILABLE_BURGER_INGREDIENT_INGREDIENTS.BACON
    },
    {
        label: AVAILABLE_BURGER_INGREDIENT_INGREDIENTS.SALAD.label,
        type: AVAILABLE_BURGER_INGREDIENT_INGREDIENTS.SALAD
    },
    {
        label: AVAILABLE_BURGER_INGREDIENT_INGREDIENTS.CHEESE.label,
        type: AVAILABLE_BURGER_INGREDIENT_INGREDIENTS.CHEESE
    },
    {
        label: AVAILABLE_BURGER_INGREDIENT_INGREDIENTS.MEAT.label,
        type: AVAILABLE_BURGER_INGREDIENT_INGREDIENTS.MEAT
    }
];

const BuildControlsContainer = styled.div`
    width: 100%;
    background-color: #CF8F2E;
    display: flex;
    flex-flow: column;
    align-items: center;
    box-shadow: 0 2px 1px #CCC;
    margin: auto;
    padding: 10px 0;
`;

const BuildControls = (props) => (
    <BuildControlsContainer>
        <p>Current Price: <strong>{props.price}</strong></p>
        {controls.map((control, index) => (
            <BuildControl 
                key={index} 
                label={control.label} 
                type={control.type}
                added={() => props.ingredientAdded(control.type)}
                removed={() => props.ingredientRemoved(control.type)}
                disabled={props.disableBuildControl(control.type)}
            />
        ))}

        <Button
            buttonType={ AvailableButtons.order } 
            disabled={!props.purchasable}
            clickFuncCB={props.ordered}>Order Now</Button>
    </BuildControlsContainer>
);

export default BuildControls;