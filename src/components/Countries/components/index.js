import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from "uuid";
import { isEmpty, map, sortBy } from 'lodash';
import { Box } from 'rebass';
import { Select } from '@rebass/forms';
import { fetchCountries } from '../../../actions/components/Countries';

/**
 * 
 * @param {object} props
 *      Json object with properties:
 *          -   htmlId
 *          -   name
 *          -   devaultValue 
 */
export const CountriesSelect = (props) => {

    const { htmlId = uuidv4(), name = 'countries', defaultValue } = props;
    const { i18n } = useTranslation();

    const dispatch = useDispatch();
    
    const countries = useSelector(state => state.country.countries);
    
    const onFetchCountries = useCallback(
        () => dispatch(fetchCountries()),
        [dispatch]
    );
    
    useEffect(() => {
        if (isEmpty(countries)) {
            onFetchCountries();
        }
    }, [onFetchCountries, countries]);

    const optionsSelectCountries = (!isEmpty(countries)) ? sortBy(map(countries, (country) => {
        const { language } = i18n;

        return {
            value: country.code,
            displayValue: (language &&
                    country.existsTranslatedNameFromTranslationsByCountryCode(language)) ?
                country.getTranslatedNameFromTranslationsByCountryCode(language) : country.name
        }
    }), [(option) => option.displayValue]) : [];

    const renderOptions = (options) => map(options, (option) => (
        <option
            key={option.value}>
                {option.displayValue}
        </option>
    )); 

    return (
        <Box>
            <Select
                id={htmlId}
                name={name}
                defaultValue={defaultValue}>
                {renderOptions(optionsSelectCountries)}
            </Select>
        </Box>
    );
}