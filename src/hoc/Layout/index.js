import React, { useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { isFunction } from 'lodash';
import  ChildrenContainer from '../';
import { SideDrawerFC, ToolbarFC } from '../../components/functional-components';

const MainContainer = styled.main`
    margin-top: 72px;
`;

/**
 * Layout component
 */
const Layout = (props) => {
    
    const [sideDrawerIsVisible, setSideDrawerIsVisible] = useState(false);

    const sideDrawerClosedHandler = () => setSideDrawerIsVisible(false);

    const sideDrawerToggleHandler = () => setSideDrawerIsVisible(!sideDrawerIsVisible);
    
    const { isAuthenticated, children } = props;

    /**
     * @inheritdoc
     */
    return (
        <ChildrenContainer>
            <ToolbarFC
                isAuth={isAuthenticated} 
                drawerToggleClicked={sideDrawerToggleHandler} />
            <SideDrawerFC
                isAuth={isAuthenticated} 
                open={sideDrawerIsVisible} 
                closed={sideDrawerClosedHandler} />
            <MainContainer>
                {children}
            </MainContainer>
        </ChildrenContainer>
    );
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.authenticatedUser !== null
            && isFunction(state.auth.authenticatedUser.isAuthenticated) 
            && state.auth.authenticatedUser.isAuthenticated()
    };
};

export default connect(mapStateToProps)(Layout);