import React from 'react';
import { v4 as uuidv4 } from "uuid";
import { BuildControlsContainer }  from '../styles';

import { 
    AVAILABLE_BURGER_INGREDIENT_INGREDIENTS, BuildControlFC 
} from '../../../';

import {
    AvailableButtons, ButtonFC
} from '../../../../UI';

// Available controls
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

/**
 * BuildControlsFC functional component
 * @param {*} props
 *      Object with the structure
 *          controls List of controls (BuildControlFC)
 * 
 * @see BuildControlFC
 */
const BuildControlsFC = (props) => (
    <BuildControlsContainer>
        <p>Current Price: <strong>{props.price}</strong></p>
        {props.controls.map((control) => {
                const availableControl = findAvailableControlByType(control.burgerIngredient.type);

                if (availableControl) {
                    return (
                        <BuildControlFC 
                            key={uuidv4()} 
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

        <ButtonFC
            buttonType={ AvailableButtons.order } 
            disabled={!props.purchasable}
            clickFuncCB={props.ordered}>Order Now</ButtonFC>
    </BuildControlsContainer>
);

export default BuildControlsFC;