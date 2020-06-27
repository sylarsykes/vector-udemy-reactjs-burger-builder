import styled from 'styled-components';

const InputContainer = styled.div`
    width: 100%;
    padding: 10px;
    box-sizing: border-box;

    & label {
        font-weight: bold;
        display: block;
        margin-bottom: 8px;
    }

    & input, textarea, select {
        outline: none;
        border: ${props => props.invalid ? '1px solid red'  : '1px solid #ccc'};
        background-color: ${props => props.invalid ? '#FDA49A' : 'white'};
        font: inherit;
        padding: 6px 10px;
        display: block;
        width: 100%;
        box-sizing: border-box;
    }

    & input:focus, textarea:focus, select:focus {
        outline: none;
        background-color: #ccc;
    }
`;

export { InputContainer };

