import React from 'react';

const ExampleValidation = (props) => {
    const inputLengthValue = props.inputLengthValue || 5;
    const validationMessage = (!props.inputLength) ? 'Input text' : 'Text long enough';
;
    if (props.inputLength && props.inputLength <= inputLengthValue) {
        throw new Error('Text too short');
    }

    return (
        <div>
            <p>{validationMessage}</p>
        </div>
    );
}

class ExampleCharBuilder {
    _style;
    _onClick;
    _character;

    get style() {
        return this._style;
    }

    setStyle = (_style) => {
        this._style = _style;
        return this;
    }

    get onClick() {
        return this._onClick;
    }

    setOnClick = (_onClick) => {
        this._onClick = _onClick;
        return this;
    }

    get character() {
        return this._character;
    }

    setCharacter = (_character) => {
        this._character = _character;
        return this;
    }

    build = () => new ExampleCharProps(this);
}

class ExampleCharProps {
    style;
    onClick;
    character;

    constructor(exampleCharBuilder) {
        this.style = exampleCharBuilder.style;
        this.onClick = exampleCharBuilder.onClick;
        this.character = exampleCharBuilder.character;
    }
}

const ExampleChar = props => {
    const style = {
        display: 'inline-block',
        padding: '16px',
        margin: '16px',
        border: '1px solid black',
        textAlign: 'center'
    };

    const exampleCharProps = new ExampleCharBuilder()
        .setStyle(props.style || style)
        .setOnClick(props.clicked)
        .setCharacter(props.character)
        .build();

    return (
        <div style={exampleCharProps.style} onClick={exampleCharProps.onClick}>
            {exampleCharProps.character}
        </div>
    );
}

export { ExampleChar, ExampleValidation };