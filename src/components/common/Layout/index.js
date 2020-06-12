import React from 'react';
import styled from 'styled-components';

import ChildrenContainer from '../../../hoc';


const mainContainer = styled.main`
    margin-top: 16px;
`;

const Layout = (props) => (
    <ChildrenContainer>
        <di>Toolbar, SideDrawer, Backdrop</di>
        <mainContainer>
            {props.children}
        </mainContainer>
    </ChildrenContainer>
);

export default Layout;