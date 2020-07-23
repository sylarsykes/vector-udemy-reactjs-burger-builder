import React from 'react';
import { ModalContainer } from '../styles';
import ChildrenContainer from '../../../../../hoc';
import { BackdropFC } from '../../../../functional-components';

/**
 * Modal component
 */
const ModalComponent = (props) => {
    const { show, modalClosed, children } = props;

    return (
        <ChildrenContainer>
            <BackdropFC show={show} clickFuncCB={modalClosed} />
            <ModalContainer show={show}>
                {children}
            </ModalContainer>
        </ChildrenContainer>
    ); 
}

export default ModalComponent;