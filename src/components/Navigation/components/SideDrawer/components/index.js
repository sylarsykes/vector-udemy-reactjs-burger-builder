import React from 'react';
import { SideDrawerContainer, SideDrawerLogoContainer  } from '../styles';
import ChildrenContainer from '../../../../../hoc';
import { 
    BackdropFC, LogoFC, NavigationItemsFC, 
    SwitchLanguageFC 
} from '../../../../functional-components';

/**
 * SideDrawer functional component
 *  
 * @param {*} props 
 *      Object with structure
 *          closed  Closed callback
 *          open Show Backdrop and SideDraweContainer
 * 
 * @see Backdrop
 */
const SideDrawerFC = (props) => (
    <ChildrenContainer>
        <BackdropFC show={props.open} clickFuncCB={props.closed} />
        <SideDrawerContainer show={props.open} >
            <SideDrawerLogoContainer>
                <LogoFC />
            </SideDrawerLogoContainer>
            <nav>
                <SwitchLanguageFC />
            </nav>
            <nav>
                <NavigationItemsFC />
            </nav>
        </SideDrawerContainer>
    </ChildrenContainer>
);

export default SideDrawerFC;
