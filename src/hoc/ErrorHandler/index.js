import React from 'react';
import { ModalComponent } from '../../components/components';
import ChildrenContainer from '../';
import { useHttpErrorHandler } from '../../components/hooks'

/**
 * Error handler component
 * 
 * @param {*} WrappedComponent 
 * @param {*} axios 
 */
const ErrorHandler = (WrappedComponent, axios) => {
    return (props) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [error, clearError] = useHttpErrorHandler(axios);

        return (
            <ChildrenContainer>
                <ModalComponent
                    show={error}
                    modalClosed={clearError}>
                        {error ? error.message : null}
                </ModalComponent>
                <WrappedComponent {...props} />
            </ChildrenContainer>
        );
    };
};

export default ErrorHandler;