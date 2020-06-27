import React from 'react';
import { BuildControlLabelContainer, BuildControlContainer } from '../styles';
import { AvailableButtons } from '../../../../../../constants';
import { ButtonGroupFC } from '../../../../../../functional-components';

/**
 * BuildControl functional component
 * 
 * @param {*} props
 *      Object with the structure:
 *          label Lable text
 *          burgerIngredient Burger ingredient model
 *          removed Removed action callback
 *          added Added action callback
 *          disabled Object to enable or disable buttons 
 */
const BuildControlFC = (props) => (
    <BuildControlContainer>
        <BuildControlLabelContainer>{props.label}</BuildControlLabelContainer>
        <ButtonGroupFC 
            buttons={[
                {
                    text: 'Less -',
                    buttonType: AvailableButtons.less,
                    clickFuncCB: props.removed,
                    disabled: !props.disabled.count
                },
                {
                    text: 'More +',
                    buttonType: AvailableButtons.more,
                    clickFuncCB: props.added
                }
            ]} />
    </BuildControlContainer>
);

export default BuildControlFC;