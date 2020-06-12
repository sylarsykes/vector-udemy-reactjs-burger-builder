import React from 'react';
import styled from 'styled-components';

import { ChildrenContainer } from '../../hoc';

const MainContainer = styled.main`
    margin-top: 16px;
`;


const Layout = (props) => (
    <ChildrenContainer>
        <div>Toolbar, SideDrawer, Backdrop</div>
        <MainContainer>
            {props.children}
        </MainContainer>
    </ChildrenContainer>
);

export default Layout;