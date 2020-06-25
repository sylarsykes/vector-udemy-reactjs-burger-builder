import React from 'react';
import { SideDrawerContainer, SideDrawerLogoContainer  } from '../styles';

import ChildrenContainer from '../../../../../hoc';
import { LogoFC } from '../../../../Logo';
import { BackdropFC } from '../../../../UI';
import { NavigationItemsFC } from '../../../../Navigation';

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
const SideDrawerFC = (props) => {
    return (
        <ChildrenContainer>
            <BackdropFC show={props.open} clickFuncCB={props.closed} />
            <SideDrawerContainer show={props.open} >
                <SideDrawerLogoContainer>
                    <LogoFC />
                </SideDrawerLogoContainer>
                <nav>
                    <NavigationItemsFC />
                </nav>
            </SideDrawerContainer>
        </ChildrenContainer>
    );
};

export default SideDrawerFC;
