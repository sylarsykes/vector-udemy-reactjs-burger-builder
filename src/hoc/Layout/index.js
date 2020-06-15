import React, { Component } from 'react';
import styled from 'styled-components';

import  ChildrenContainer from '../';
import { SideDrawer, Toolbar } from '../../components';

const MainContainer = styled.main`
    margin-top: 72px;
`;

class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false});
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => { return { showSideDrawer: !prevState.showSideDrawer};});
    }

    render = () => (
        <ChildrenContainer>
            <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} />
            <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler} />
            <MainContainer>
                {this.props.children}
            </MainContainer>
        </ChildrenContainer>
    )
} 

export default Layout;