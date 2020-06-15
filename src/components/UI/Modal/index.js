import React, { Component } from 'react';
import styled from 'styled-components';

import ChildrenContainer from '../../../hoc';
import Backdrop from '../Backdrop';

const ModalContainer = styled.div`
    position: fixed;
    z-index: 500;
    background-color: white;
    width: 70%;
    border: 1px solid #ccc;
    box-shadow: 1px 1px 1px black;
    padding: 16px;
    left: 15%;
    top: 30%;
    box-sizing: border-box;
    transition: all 0.3s ease-out;
    transform: ${props => props.show ? "translateY(0)" : "translateY(-100vh)" };
    opacity; ${props => props.show ? "1" : "0"};

    @media (min-width: 600px) {
        width: 500px;
        left: calc(50% - 250px);
    }
`;

class Modal extends Component {

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
    componentWillUpdate = () => console.log('[Modal] Will Update');

    /**
     * @inheritdoc
     */
    render = () => (
        <ChildrenContainer>
            <Backdrop show={this.props.show} clickFuncCB={this.props.modalClosed} />
            <ModalContainer show={this.props.show}>
                {this.props.children}
            </ModalContainer>
        </ChildrenContainer>
    ); 
}

export default Modal;