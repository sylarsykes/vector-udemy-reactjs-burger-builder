import styled from 'styled-components';

const OrderContainer = styled.div`
    width: 80%;
    border: 1px solid #eee;
    box-shadow: 0 2px 3px #ccc;
    padding: 10px;
    margin: 10px auto;
    box-sizing: border-box;
`;

const OrderIngredientSpanContainer = styled.span`
    textTransform: capitalize,
    display: inline-block,
    margin: 0 8px,
    border: 1px solid #ccc,
    padding: 5px
`;

export { OrderContainer, OrderIngredientSpanContainer };