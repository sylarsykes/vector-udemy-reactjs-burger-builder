import React from 'react';
import { InputContainer, InputErrorMessagePContainer } from '../styles';

const AvailableInputs = {
    default: 'input',
    input: 'input',
    textarea: 'textarea',
    select: 'select'
}

/**
 * @see https://www.w3schools.com/html/html_form_input_types.asp
 */
const AvailableInputInputTypes = {
    checkbox: 'checkbox',
    color: 'color',
    date: 'date',
    email: 'email',
    number: 'number',
    password: 'password',
    radio: 'radio',
    reset: 'reset',
    tel: 'tel',
    text: 'text',
    url: 'url'
}

/**
 * Input functional component
 * 
 * @param {*} props 
 */
const InputFC = (props) => {
    let inputElement = null;

    const invalid = (props.invalid && props.shouldValidate && props.touched);
    const validationError = (props.invalid && props.touched && props.errorMessage) ? (
        <InputErrorMessagePContainer>{props.errorMessage}</InputErrorMessagePContainer>
    ) : '';

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
            {validationError}
        </InputContainer>
    );
};

export default InputFC;
export { AvailableInputs, AvailableInputInputTypes };