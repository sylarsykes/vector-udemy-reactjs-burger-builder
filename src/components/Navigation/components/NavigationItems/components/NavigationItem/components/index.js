import React from 'react';
import { NavLink } from 'react-router-dom';
import { NavigationItemContainer } from '../styles';

/**
 * Navigation item functional component
 * 
 * @param {*} props 
 *      Object with structure
 *          active Navigation item active
 */
const NavigationItemFC = (props) => (
    <NavigationItemContainer>
        <NavLink 
            to={props.link}
            exact={props.exact}>
                {props.children}
        </NavLink>  
    </NavigationItemContainer>
);

export default NavigationItemFC;