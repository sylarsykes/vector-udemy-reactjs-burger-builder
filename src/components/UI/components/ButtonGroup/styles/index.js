import styled from 'styled-components';

const ButtonGroupContainer = styled.div `
    width: ${props => props.width ? props.width : '100%'};
    background-color: ${props => props.background ? props.background.color : '#CF8F2E'};
    display: flex;
    flex-flow: column;
    align-items: center;
    box-shadow: 0 2px 1px ${props => props.boxShadow ? props.boxShadow.color : '#CCC'};
    margin: auto;
    padding: 10px 0;
`;

export { ButtonGroupContainer };

