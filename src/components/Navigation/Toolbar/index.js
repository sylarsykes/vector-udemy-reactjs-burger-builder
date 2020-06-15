import React from 'react';
import styled from 'styled-components';

import { DrawerToggle, Logo, NavigationItems } from '../../';

const ToolbarContainer = styled.header`
    height: 56px;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-color: #703B09;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    box-sizing: border-box;
    z-index: 90;

    & nav {
        height: 100%;
    }
`;

const ToolbarLogoContainer = styled.div`
    height: 80%;
`;

const ToolbarNavigationItemsNavContainer = styled.nav`
    @media (max-width: 499px) {
        display: none;
    }
`;

const Toolbar = (props) => (
    <ToolbarContainer>
        <DrawerToggle clicked={props.drawerToggleClicked} />
        <ToolbarLogoContainer>
            <Logo />
        </ToolbarLogoContainer>
        <ToolbarNavigationItemsNavContainer>
            <NavigationItems />
        </ToolbarNavigationItemsNavContainer>
    </ToolbarContainer>
);

export default Toolbar;