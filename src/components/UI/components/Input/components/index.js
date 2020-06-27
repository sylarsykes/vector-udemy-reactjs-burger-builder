import React from 'react';
import { InputContainer } from '../styles';

const AvailableInputs = {
    default: 'input',
    input: 'input',
    textarea: 'textarea',
    select: 'select'
}

/**
 * Input functional component
 * 
 * @param {*} props 
 */
const InputFC = (props) => {
    let inputElement = null;
    const invalid = (props.invalid && props.shouldValidate && props.touched) ? true : false;

    switch (props.elementType) {
        case (AvailableInputs.textarea):
            inputElement = (
                <textarea
                    {...props.elementConfig}
                    value={props.value}
                    onChange={props.changed} />
            );
            break;

        case (AvailableInputs.select):
            inputElement = (
                <select
                    value={props.value}
                    onChange={props.changed}>
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>
            );
            break;

        case (AvailableInputs.default):
        case (AvailableInputs.input):
        default:
            inputElement = (
                <input
                    {...props.elementConfig}
                    value={props.value}
                    onChange={props.changed} />
            );
            break;
    }

    return (
        <InputContainer invalid={invalid}>
            <label>{props.label}</label>
            {inputElement}
        </InputContainer>
    );
};

export default InputFC;
export { AvailableInputs };