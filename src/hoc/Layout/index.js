import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import  ChildrenContainer from '../';
import { SideDrawerFC, ToolbarFC } from '../../components/functional-components';

const MainContainer = styled.main`
    margin-top: 72px;
`;

/**
 * Layout component
 */
class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => this.setState({showSideDrawer: false});

    sideDrawerToggleHandler = () => this.setState((prevState) => { return { showSideDrawer: !prevState.showSideDrawer}; });

    /**
     * @inheritdoc
     */
    render = () => (
        <ChildrenContainer>
            <ToolbarFC
                isAuth={this.props.isAuthenticated} 
                drawerToggleClicked={this.sideDrawerToggleHandler} />
            <SideDrawerFC
                isAuth={this.props.isAuthenticated} 
                open={this.state.showSideDrawer} 
                closed={this.sideDrawerClosedHandler} />
            <MainContainer>
                {this.props.children}
            </MainContainer>
        </ChildrenContainer>
    )
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    };
};

export default connect(mapStateToProps)(Layout);