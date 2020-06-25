import React, { Component } from 'react';
import PropTypes from 'prop-types';

import  {
    BreadTopContainer, SeedsLeftContainer, SeedsRightContainer,
    PicklesContainer, BaconContainer, SaladContainer,
    CheeseContainer, VeganCheeseContainer, MeatContainer,
    VeganMeatContainer, BreadBottomContainer
} from '../styles';

/**
 *  Available ingredients an containers BurgerIngredients
 */
const AVAILABLE_BURGER_INGREDIENT_INGREDIENTS = {
    BREAD_TOP: {
        type: 'bread-top',
        container: <BreadTopContainer><SeedsLeftContainer/><SeedsRightContainer/></BreadTopContainer>
    },
    PICKLES: {
        type: 'pickles',
        container: <PicklesContainer />
    },
    BACON: {
        type: 'bacon',
        container: <BaconContainer />
    },
    SALAD: {
        type: 'salad',
        container: <SaladContainer />
    },
    MEAT: {
        type: 'meat',
        container: <MeatContainer />
    },
    VEGAN_MEAT: {
        type: 'vegan-meat',
        container: <VeganMeatContainer />
    },
    CHEESE: {
        type: 'cheese',
        container: <CheeseContainer />
    },
    VEGAN_CHEESE: {
        type: 'vegan-cheese',
        container: <VeganCheeseContainer />
    },
    BREAD_BOTTOM: {
        type: 'bread-bottom',
        container: <BreadBottomContainer />
    }
};

/**
 * Burger ingredient component
 */
class BurgerIngredientComponent extends Component {
    
    /**
     * Find ingredient by burgerIngredient
     * 
     * @param {*} type Available burger ingredient
     */
    _findAvailableBurgerIngredientByType = (type) => {
        var availableBurgerIngredient = Object.keys(AVAILABLE_BURGER_INGREDIENT_INGREDIENTS).find((ingredient) => AVAILABLE_BURGER_INGREDIENT_INGREDIENTS[ingredient].type === type);

        if (availableBurgerIngredient) {
            return AVAILABLE_BURGER_INGREDIENT_INGREDIENTS[availableBurgerIngredient];
        }

        return null;
    }


    render = () => {
        const { burgerIngredient, type } = this.props;
        const availabelBurgerIngredient = this._findAvailableBurgerIngredientByType(type);
        
        return (burgerIngredient && availabelBurgerIngredient) ? availabelBurgerIngredient.container : null;
    }
}

// Prop types of burger ingredient
BurgerIngredientComponent.propTypes = {
    type: PropTypes.string.isRequired
}

export default BurgerIngredientComponent;
export { AVAILABLE_BURGER_INGREDIENT_INGREDIENTS };