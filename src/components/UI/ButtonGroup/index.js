import React from 'react';
import styled from 'styled-components';

import Button from '../Button';

const ButtonGroupContainer = styled.div`
    width: ${props => props.width ? props.width : '100%'};
    background-color: ${props => props.background ? props.background.color : '#CF8F2E'};
    display: flex;
    flex-flow: column;
    align-items: center;
    box-shadow: 0 2px 1px ${props => props.boxShadow ? props.boxShadow.color : '#CCC'};
    margin: auto;
    padding: 10px 0;
`;

const ButtonGroup = (props) => {
    const { buttons, containerProps } = props;

    return (
        <ButtonGroupContainer {...containerProps } >
            {buttons.map((button, index) => (
                <Button key={index} {...button }>
                    {button.text}
                </Button>
            ))}
        </ButtonGroupContainer>
    );
};

export default ButtonGroup;
