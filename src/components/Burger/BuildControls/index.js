import React from 'react';
import styled from 'styled-components';

import { AVAILABLE_BURGER_INGREDIENT_INGREDIENTS } from '../BurgerIngredient';
import BuildControl from './BuildControl';

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

const BuildControlsOrderButton = styled.button`
    background-color: #DAD735;
    outline: none;
    cursor: pointer;
    border: 1px solid #966909;
    color: #966909;
    font-family: inherit;
    font-size: 1.2em;
    padding: 15px 30px;
    box-shadow: 2px 2px 2px #966909;

    &:hover, :active {
        background-color: #A0DB41;
        border: 1px solid #966909;
        color: #966909;
    }

    &:disabled {
        background-color: #C7C6C6;
        cursor: not-allowed;
        border: 1px solid #ccc;
        color: #888888;
    }

    &:not(:disabled) {
        animation: enable 0.3 s linear;
    }

    @keyframes enable {
        0% {
            transform: scale(1);
        }
        60% {
            transform: scale(1.1);
        }
        100% {
            transform: scale(1);
        }
    }
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
        <BuildControlsOrderButton 
            disabled={!props.purchasable}
            onClick={props.ordered} >Order now</BuildControlsOrderButton>
    </BuildControlsContainer>
);

export default BuildControls;