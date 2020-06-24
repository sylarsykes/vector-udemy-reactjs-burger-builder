import React from 'react';
import styled from 'styled-components';

import { AVAILABLE_BURGER_INGREDIENT_INGREDIENTS, BuildControl, Button,
        AvailableButtons } from '../../';

const controls = [
    { 
        type: AVAILABLE_BURGER_INGREDIENT_INGREDIENTS.PICKLES.type
    },
    {
        type: AVAILABLE_BURGER_INGREDIENT_INGREDIENTS.BACON.type
    },
    {
        type: AVAILABLE_BURGER_INGREDIENT_INGREDIENTS.SALAD.type
    },
    {
        type: AVAILABLE_BURGER_INGREDIENT_INGREDIENTS.CHEESE.type
    },
    {
        type: AVAILABLE_BURGER_INGREDIENT_INGREDIENTS.MEAT.type
    }
];

/**
  * Find ingredient by burgerIngredient
  * 
  * @param {*} type Available burger ingredient
  */
const findAvailableControlByType = (type) => controls.find((control) => control.type === type);

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
        {props.controls.map((control, index) => {
                const availableControl = findAvailableControlByType(control.burgerIngredient.type);

                if (availableControl) {
                    return (
                        <BuildControl 
                            key={index} 
                            label={control.burgerIngredient.label} 
                            burgerIngredient={control.burgerIngredient}
                            added={() => props.ingredientAdded(control.burgerIngredient)}
                            removed={() => props.ingredientRemoved(control.burgerIngredient)}
                            disabled={props.disableBuildControl(control.burgerIngredient)}
                        />
                    )
                }

                return '';
            }
        )}

        <Button
            buttonType={ AvailableButtons.order } 
            disabled={!props.purchasable}
            clickFuncCB={props.ordered}>Order Now</Button>
    </BuildControlsContainer>
);

export default BuildControls;