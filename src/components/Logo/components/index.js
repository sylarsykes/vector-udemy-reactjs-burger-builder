import React from 'react';
import { LogoContainer } from '../styles';
import { burgerLogo } from '../../../../public';

/**
 * Logo functional component
 * 
 * @param {*} props 
 *      Object with structure
 *          height Logo height
 *          imgSource Image path
 *          altText Img alt value
 */
const LogoFC = (props) => {

    let { imgSource, altText } = props;
    const { height } = props;

    if (!imgSource) {
        imgSource = burgerLogo;
    }

    if (!altText) {
        altText = 'MyBurger';
    }

    return (
        <LogoContainer containerHeight={height}>
            <img src={imgSource} alt={altText} />
        </LogoContainer>
    );
};

export default LogoFC;