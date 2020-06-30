import React from 'react';
import { useTranslation } from "react-i18next";
import { AvailableButtons } from '../../../../constants';
import { ButtonFC } from '../../../../functional-components';

/**
 * Switch language functional component
 * 
 * @param {*} props 
 */
const SwitchLanguageFC = (props) => {
    const { i18n } = useTranslation();

    const changeLanguageHandler = code => e => {
        localStorage.setItem('language', code);
        i18n.changeLanguage(code);
        window.location.reload();
    }

    return (
        <div>
            <ButtonFC
                buttonType={AvailableButtons.danger} 
                clickFuncCB={changeLanguageHandler('en')}>
                    En
            </ButtonFC>
            <ButtonFC
                buttonType={AvailableButtons.success}
                clickFuncCB={changeLanguageHandler('es  ')}>
                    Es
            </ButtonFC>
        </div>
    );
};

export default SwitchLanguageFC;