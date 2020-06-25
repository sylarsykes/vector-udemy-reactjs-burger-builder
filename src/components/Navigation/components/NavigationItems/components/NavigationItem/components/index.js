import React from 'react';
import {
    NavigationItemContainer,
    NavigationItemLinkContainer,
    NavigationItemLinkActiveContainer
} from '../styles';

/**
 * Navigation item functional component
 * 
 * @param {*} props 
 *      Object with structure
 *          active Navigation item active
 */
const NavigationItemFC = (props) => (
    <NavigationItemContainer>
        {
            props.active ? 
                (<NavigationItemLinkActiveContainer href={props.link}>{props.children}</NavigationItemLinkActiveContainer>) : 
                (<NavigationItemLinkContainer href={props.link}>{props.children}</NavigationItemLinkContainer>) 
        }
    </NavigationItemContainer>
);

export default NavigationItemFC;