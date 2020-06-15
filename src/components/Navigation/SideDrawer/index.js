import React from 'react';
import styled from 'styled-components';

import { ChildrenContainer } from '../../../hoc';
import { Logo, NavigationItems, Backdrop } from '../../';

const SideDrawerContainer = styled.div`
    position: fixed;
    width: 280px;
    max-width: 70%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 200;
    background-color: white;
    padding: 32px 16px;
    box-sizing: border-box;
    transition: transform 0.3s ease-out;
    transform: ${props => props.show ? 'transform: translateX(0)' : 'translateX(-100%)'};

    @media (min-width: 500px) {
        display: none;
    }
`;

const SideDrawerLogoContainer = styled.div`
    height: 11%;
    margin-bottom: 32px;
`;

const SideDrawer = (props) => {
    return (
        <ChildrenContainer>
            <Backdrop show={props.open} clickFuncCB={props.closed} />
            <SideDrawerContainer show={props.open} >
                <SideDrawerLogoContainer>
                    <Logo />
                </SideDrawerLogoContainer>
                <nav>
                    <NavigationItems />
                </nav>
            </SideDrawerContainer>
        </ChildrenContainer>
    );
};

export default SideDrawer;
