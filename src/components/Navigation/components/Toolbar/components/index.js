import React from 'react';
import { 
    ToolbarContainer, ToolbarLogoContainer, ToolbarNavigationItemsNavContainer 
} from '../styles';

import { LogoFC } from '../../../../Logo';
import { DrawerToggleFC, NavigationItemsFC } from '../../../../Navigation';

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