import React, { Component } from 'react';

import { ChildrenContainer } from '../../hoc';
import { Burger, AVAILABLE_BURGER_INGREDIENT_INGREDIENTS } from '../../components';

export default class BurgerBuilder extends Component {
    state = {
        ingredients: [
            {
                type: AVAILABLE_BURGER_INGREDIENT_INGREDIENTS.PICKLES,
                count: 1
            },
            {
                type: AVAILABLE_BURGER_INGREDIENT_INGREDIENTS.BACON,
                count: 2
            },
            {
                type: AVAILABLE_BURGER_INGREDIENT_INGREDIENTS.SALAD,
                count: 1
            },
            {
                type: AVAILABLE_BURGER_INGREDIENT_INGREDIENTS.CHEESE,
                count: 1
            },
            {
                type: AVAILABLE_BURGER_INGREDIENT_INGREDIENTS.MEAT,
                count: 2
            }
        ]
    }
    
    render = () => (
        <ChildrenContainer>
            <Burger ingredients={this.state.ingredients} />
            <div>Build controls</div>
        </ChildrenContainer>
    );
};