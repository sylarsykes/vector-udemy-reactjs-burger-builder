import React from 'react';
import { NavigationItemsUlContainer } from '../styles';
import { NavigationItemFC } from '../../../../functional-components';
import { 
    BURGER_BUILDER_ROUTE, ORDERS_ROUTE, LOGOUT_ROUTE, 
    AUTH_ROUTE 
} from '../../../../../containers/routes';
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
        {props.isAuthenticated ? <NavigationItemFC 
            link={ ORDERS_ROUTE } >
                Orders
        </NavigationItemFC> : null}
        {!props.isAuthenticated ?
            <NavigationItemFC 
                link={ AUTH_ROUTE } >
                Authenticate
            </NavigationItemFC> :
            <NavigationItemFC 
                link={ LOGOUT_ROUTE } >
                Logout
            </NavigationItemFC>} 
    </NavigationItemsUlContainer>
);

export default NavigationItemsFC;