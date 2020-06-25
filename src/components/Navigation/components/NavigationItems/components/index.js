import React from 'react';
import { NavigationItemsUlContainer } from '../styles';

import { NavigationItemFC } from '../../../';

/**
 * Navigations items functional component
 * 
 * @param {*} props 
 */
const NavigationItemsFC = (props) => (
    <NavigationItemsUlContainer>
        <NavigationItemFC link="/" active>Burger builder</NavigationItemFC>
        <NavigationItemFC link="/" >Checkout</NavigationItemFC>
    </NavigationItemsUlContainer>
);

export default NavigationItemsFC;