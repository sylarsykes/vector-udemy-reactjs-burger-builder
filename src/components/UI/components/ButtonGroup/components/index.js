import React from 'react';
import { ButtonGroupContainer } from '../styles';
import { ButtonFC } from '../../../../functional-components';

/**
 * Button group functional component
 * 
 * @param {*} props 
 *      Object with stucture
 *          buttons List object for ButtonFC
 */
const ButtonGroupFC = (props) => {
    const { buttons, containerProps } = props;

    return (
        <ButtonGroupContainer {...containerProps } >
            {buttons.map((button, index) => (
                <ButtonFC key={index} {...button }>
                    {button.text}
                </ButtonFC>
            ))}
        </ButtonGroupContainer>
    );
};

export default ButtonGroupFC;
