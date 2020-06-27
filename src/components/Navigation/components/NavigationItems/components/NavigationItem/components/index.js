import React from 'react';
import { BrowserRouter, NavLink } from 'react-router-dom';
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
        <BrowserRouter>
            <NavLink 
                to={props.link}
                exact={props.exact}>
                    {props.children}
            </NavLink> 
        </BrowserRouter> 
    </NavigationItemContainer>
);

export default NavigationItemFC;