import React from 'react';
import styled from 'styled-components';

import NavigationItem from './NavigationItem';

const NavigationItemsUlContainer = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-flow: column;
    align-items: center;
    height: 100%;

    @media (min-width: 500px) {
        flex-flow: row;
    }
`;

const NavigationItems = (props) => (
    <NavigationItemsUlContainer>
        <NavigationItem link="/" active>Burger builder</NavigationItem>
        <NavigationItem link="/" >Checkout</NavigationItem>
    </NavigationItemsUlContainer>
);

export default NavigationItems;