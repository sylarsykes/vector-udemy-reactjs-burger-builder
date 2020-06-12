import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const BreadTopContainer = styled.div`
    height: 20%;
    width: 80%;
    background: linear-gradient(#bc581e, #e27b36);
    border-radius: 50% 50% 0 0;
    box-shadow: inset -15px 0 #c15711;
    margin: 2% auto;
    position: relative;
`;

const SeedsLeftContainer = styled.div`
    width: 10%;
    height: 15%;
    position: absolute;
    background-color: white;
    left: 30%;
    top: 50%;
    border-radius: 40%;
    transform: rotate(-20deg);
    box-shadow: inset -2px -3px #c9c9c9;
    
    &:before {
        content: "";
        width: 100%;
        height: 100%;
        position: absolute;
        background-color: white;
        left: 180%;
        top: -50%;
        border-radius: 40%;
        transform: rotate(60deg);
        box-shadow: inset -1px -3px #c9c9c9;
    }

    &:after {
        content: "";
        width: 100%;
        height: 100%;
        position: absolute;
        background-color: white;
        left: -170%;
        top: -260%;
        border-radius: 40%;
        transform: rotate(60deg);
        box-shadow: inset -1px 2px #c9c9c9;
    }
`;

const SeedsRightContainer = styled.div`
    width: 10%;
    height: 15%;
    position: absolute;
    background-color: white;
    left: 64%;
    top: 50%;
    border-radius: 40%;
    transform: rotate(10deg);
    box-shadow: inset -3px 0 #c9c9c9;

    &:before {
        content: "";
        width: 100%;
        height: 100%;
        position: absolute;
        background-color: white;
        left: 150%;
        top: -130%;
        border-radius: 40%;
        transform: rotate(90deg);
        box-shadow: inset 1px 3px #c9c9c9;
    }
`;

const PicklesContainer = styled.div `
    width: 80%;
    height: 3%;
    background: linear-gradient(#228f5d, #91cf70);
    margin: 2% auto
`;

const BaconContainer = styled.div `
    width: 80%;
    height: 3%;
    background: linear-gradient(#bf3813, #c45e38);
    margin: 2% auto;
`;

const SaladContainer = styled.div `
    width: 85%;
    height: 7%;
    margin: 2% auto;
    background: linear-gradient(#228c1d, #91ce50);
    border-radius: 20px;
`;

const CheeseContainer = styled.div `
    width: 90%;
    height: 4.5%;
    margin: 2% auto;
    background: linear-gradient(#f4d004, #d6bb22);
    border-radius: 20px;
`;

const VeganCheeseContainer = styled.div `
    width: 90%;
    height: 4.5%;
    margin: 2% auto;
    background: linear-gradient(#f4d054, #d6bb62);
    border-radius: 20px;
`;

const MeatContainer = styled.div`
    width: 80%;
    height: 8%;
    background: linear-gradient(#7f3608, #702e05);
    margin: 2% auto;
    border-radius: 15px;
`;

const VeganMeatContainer = styled.div`
    width: 80%;
    height: 8%;
    background: linear-gradient(#7f3648, #702e45);
    margin: 2% auto;
    border-radius: 15px;
`;

const BreadBottomContainer = styled.div `
    height: 13%;
    width: 80%;
    background: linear-gradient(#F08E4A, #e27b36);
    border-radius: 0 0 30px 30px;
    box-shadow: inset -15px 0 #c15711;
    margin: 2% auto;
`;

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
        container: < BreadBottomContainer / >
    }
};

/**
 * BurgerIngredientComponent
 */
class BurgerIngredient extends Component {

    render = () => {
        const { type } = this.props;

        if (type && type.container) {
            return type.container;
        }

        return (type && type.container) ? type.container : null;
    }
}

// Prop types of burger ingredient
BurgerIngredient.propTypes = {
    type: PropTypes.string.isRequired
}

export default BurgerIngredient;
export { AVAILABLE_BURGER_INGREDIENT_INGREDIENTS };