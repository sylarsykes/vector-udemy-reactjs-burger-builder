import React from 'react';
import { BackdropContainer } from '../styles';

/**
 * Backdrop functional component
 * 
 * @param {*} props 
 *      Object with structure
 *          clickFuncCB Click callback
 */
const BackdropFC = (props) => (
        props.show ? <BackdropContainer onClick={props.clickFuncCB} /> : null
);

export default BackdropFC;