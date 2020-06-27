import React from 'react';
import { 
    ToolbarContainer, ToolbarLogoContainer, ToolbarNavigationItemsNavContainer 
} from '../styles';
import { DrawerToggleFC, LogoFC, NavigationItemsFC } from '../../../../functional-components';

/**
 * Toolbar functional component
 * 
 * @param {*} props 
 *      Object with structure
 *          drawerToggleClicked Drawer toggle clicked callback
 */
const ToolbarFC = (props) => (
    <ToolbarContainer>
        <DrawerToggleFC clicked={props.drawerToggleClicked} />
        <ToolbarLogoContainer>
            <LogoFC />
        </ToolbarLogoContainer>
        <ToolbarNavigationItemsNavContainer>
            <NavigationItemsFC />
        </ToolbarNavigationItemsNavContainer>
    </ToolbarContainer>
);

export default ToolbarFC;