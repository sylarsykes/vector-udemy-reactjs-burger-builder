import React from 'react';
import { NavigationItemsUlContainer } from '../styles';
import { NavigationItemFC } from '../../../../functional-components';
import { BURGER_BUILDER_ROUTE, ORDERS_ROUTE } from '../../../../../containers/routes';
/**
 * Navigations items functional component
 * 
 * @param {*} props 
 */
const NavigationItemsFC = (props) => (
    <NavigationItemsUlContainer>
        <NavigationItemFC 
            link={ BURGER_BUILDER_ROUTE } 
            exact>
                Burger builder
        </NavigationItemFC>
        <NavigationItemFC 
            link={ ORDERS_ROUTE } >
                Orders
        </NavigationItemFC>
    </NavigationItemsUlContainer>
);

export default NavigationItemsFC;