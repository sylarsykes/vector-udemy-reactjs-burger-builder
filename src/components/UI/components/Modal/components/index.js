import React, { Component } from 'react';
import { ModalContainer } from '../styles';
import ChildrenContainer from '../../../../../hoc';
import { BackdropFC } from '../../../../functional-components';

/**
 * Modal component
 */
class ModalComponent extends Component {

    /**
     * @inheritdoc
     * 
     * @param {*} nextProps 
     * @param {*} nextState 
     */
    shouldComponentUpdate = (nextProps, nextState) => nextProps.show !== this.props.show;

    /**
     * @inheritdoc
     */
    render = () => (
        <ChildrenContainer>
            <BackdropFC show={this.props.show} clickFuncCB={this.props.modalClosed} />
            <ModalContainer show={this.props.show}>
                {this.props.children}
            </ModalContainer>
        </ChildrenContainer>
    ); 
}

export default ModalComponent;