import styled from 'styled-components';

const CheckoutSummaryContainer = styled.div`
    text-align: center;
    width: 80%;
    margin: auto;

    @media (min-width: 600px) {
        width: 500px;
    }
`;

const CheckoutSummaryBurgerContainer = styled.div`
    width: 100%, 
    margin: auto
`;

export { CheckoutSummaryContainer, CheckoutSummaryBurgerContainer };