import React from 'react';
import { DrawerToggleContainer } from '../styles';

/**
 * DrawerToggle functional component
 * 
 * @param {*} props 
 *      Object with structure
 *          clicked Click callback
 */
const DrawerToggleFC = (props) => (
    <DrawerToggleContainer onClick={props.clicked}>
        <div></div>
        <div></div>
        <div></div>
    </DrawerToggleContainer>
);

export default DrawerToggleFC;