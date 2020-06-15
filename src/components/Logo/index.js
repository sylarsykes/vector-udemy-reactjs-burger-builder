import React from 'react';
import styled from 'styled-components';

import { burgerLogo } from '../../../public';

const LogoContainer = styled.div`
    background-color: white;
    padding: 8px;
    height: ${props => props.containerHeight ? props.containerHeigh : '100%'};
    box-sizing: border-box;
    border-radius: 5px;

    & img {
        height: 100%;
    }
`;

const Logo = (props) => (
    <LogoContainer containerHeight={props.height}>
        <img src={burgerLogo} alt="MyBurger" />
    </LogoContainer>
);

export default Logo;