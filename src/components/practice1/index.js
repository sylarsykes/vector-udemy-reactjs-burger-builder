import React from 'react';

class ExampleUserInputPropsBuilder {
    _type;
    _className;
    _style;
    _onChange;
    _value;

    get type() {
        return this._type;
    }

    setType(_type) {
        this._type = _type;
        return this;
    }

    get className() {
        return this._className;
    }

    setClassName(_className) {
        this._className = _className;
        return this;
    }

    get style() {
        return this._style;
    }

    setStyle(_style) {
        this._style = _style;
        return this;
    }

    get onChange() {
        return this._onChange;
    }

    setOnChange(_onChange) {
        this._onChange = _onChange;
        return this;
    }

    get value() {
        return this._value;
    }

    setValue(_value) {
        this._value = _value;
        return this;
    }

    build() {
        return new ExampleUserInputProps(this);
    }
}

class ExampleUserInputProps {
    type;
    className;
    style;
    onChange;
    value;

    constructor(exampleUserInputPropsBuilder) {
        this.type = exampleUserInputPropsBuilder.type;
        this.style = exampleUserInputPropsBuilder.style;
        this.onChange = exampleUserInputPropsBuilder.onChange;
        this.value = exampleUserInputPropsBuilder.value; 
    }
};

const ExampleUserInput = props => {
    const exampleUserInputProps = new ExampleUserInputPropsBuilder()
        .setType(props.type)
        .setClassName(props.className)
        .setStyle(props.style)
        .setOnChange(props.changed)
        .setValue(props.currentName)
        .build();
    
    return (
        <div className={exampleUserInputProps.className}>
            <input {...exampleUserInputProps} />
        </div>
    );
};


class ExampleUserOutputPropsBuilder {
    _className;
    _username;
    _children;

    get className() {
        return this._className;
    }

    setClassName(_className) {
        this._className = _className;
        return this;
    }

    get username() {
        return this._username;
    }

    setUsername(_username) {
        this._username = _username;
        return this;
    }

    get children() {
        return this._children;
    }

    setChildren(_children) {
        this._children = _children;
        return this;
    }

    build() {
        return new ExampleUserOutputProps(this);
    }
}

class ExampleUserOutputProps {
    className;
    username;
    children;

    constructor(exampleUserOutputPropsBuilder) {
        this.className = exampleUserOutputPropsBuilder.className;
        this.username = exampleUserOutputPropsBuilder.username;
        this.children = exampleUserOutputPropsBuilder.children;
    }
};

const ExampleUserOutput = props => {
    const exampleUserOutputProps = new ExampleUserOutputPropsBuilder()
        .setClassName(props.className)
        .setUsername(props.username)
        .setChildren(props.children)
        .build();
    
    return (
        <div className={exampleUserOutputProps.className}>
            <p>Username: {exampleUserOutputProps.username}</p>
            <p>{exampleUserOutputProps.children}</p>
        </div>
    );
};

export default ExampleUserInput;

export {ExampleUserInput, ExampleUserOutput};
