import styled from 'styled-components';

const LogoContainer = styled.div `
    background-color: white;
    padding: 8px;
    height: ${props => props.containerHeight ? props.containerHeigh : '100%'};
    box-sizing: border-box;
    border-radius: 5px;

    & img {
        height: 100%;
    }
`;

export { LogoContainer };