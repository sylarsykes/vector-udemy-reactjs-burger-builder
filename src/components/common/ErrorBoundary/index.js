import React, { Component } from 'react';
import styled from 'styled-components';


const ErrorContainer = styled.div`
    text-align: center;
`;

const ErrorH2 = styled.h2`
    background: transparent;
    border-radius: 3 px;
    border: 2 px solid palevioletred;
    color: palevioletred;
    margin: 0 1 em;
    padding: 0.25 em 1 em;
`;


class ErrorBoundary extends Component {
    state = {
        hasError: false,
        errorMessage: ''
    }

    setStateErrorMessage = (errorMessage) => {
        this.setState({hasError: true, errorMessage: errorMessage});
    }

    /**
     * @inheritdoc
     * @override
     */
    // Catch and show errors
    componentDidCatch = (errorMessage, info) => {
        this.setStateErrorMessage(errorMessage);
    }

    /**
     * @inheritdoc
     * @override
     */
    render() {
        if (!this.state.hasError) {
            return this.props.children;
        }

        return (
            <ErrorContainer>
                <ErrorH2>{this.state.errorMessage}</ErrorH2>
            </ErrorContainer>
        );
    }
}

export default ErrorBoundary;