// @see https://restcountries.eu/
// @see https://github.com/nobrainr/morphism
import { Model, ArrayModel } from 'objectmodel';
import { morphism } from 'morphism';
import { isEmpty, isUndefined, map, find } from 'lodash';

export const COUNTRIES_BASE_URL = 'https://restcountries.eu/rest/v2/'; 

/**
 * Country translations model
 */
class CountryTranslationModel extends Model({
    code: String,
    name: [String]
}) {

}

/**
 * 
 * @param {object} properties
 *      Properties
 *          -   code
 *          -   name
 */
CountryTranslationModel.build = (properties) => new CountryTranslationModel(properties);

/**
 * Calling codes for country model
 */
class CountryCallingCodeModel extends Model({
    countryCode: String,
    callingCode: String 
}) {

}

/**
 * 
 * @param {object} properties
 *      Properties
 *          -   code
 *          -   name
 */
CountryCallingCodeModel.build = (properties) => new CountryCallingCodeModel(properties);

/**
 * Countries model
 * 
 * Properties:
 *      -   code,
 *      -   name,
 *      -   capital,
 *      -   translations
 * 
 * @see Model
 * @see ArrayModel
 * @see CountryTranslationModel
 */
export class CountriesModel extends Model({
    code: String,
    name: String,
    capital: String,
    translations: ArrayModel(CountryTranslationModel),
    callingCodes: ArrayModel(CountryCallingCodeModel)
}) {
    
    /**
     * Check if exists translated name by country code
     * 
     * @param {String} code 
     */
    existsTranslatedNameFromTranslationsByCountryCode(code) {
        const { translations } = this;

        if (!isEmpty(translations)) {
            const translatedName = find(translations, { code });
            
            if (!isUndefined(translatedName)) {
                return true;
            }
        }

        return false;
    }

    /**
     * Get translated name by country code parameter
     * 
     * @param {String} code
     *      Country code 
     */
    getTranslatedNameFromTranslationsByCountryCode(code) {
        const { name, translations } = this;

        if (!isEmpty(translations)) {
            const translatedName = find(translations, { code });
            
            if (!isUndefined(translatedName) && translatedName.name) {
                return translatedName.name;
            }
        }

        return name;
    }
}

/**
 * Schema for map model
 * 
 * @see morphism
 */
export const CountrySchemaModel = {
    code: 'alpha3Code',
    name: 'name',
    capital: 'capital',
    translations: (iteratee, source, destination) => {
        let translations = [];

        if (iteratee.translations && !isEmpty(iteratee.translations)) {
            translations = map(iteratee.translations, (name, code) => CountryTranslationModel.build({
                code,
                name
            }));
        }

        return translations;
    },
    callingCodes: (iteratee, source, destination) => {
        let callingCodes = [];

        if (iteratee.callingCodes && !isEmpty(iteratee.callingCodes)) {
            callingCodes = map(iteratee.callingCodes, (callingCode) => CountryCallingCodeModel.build({
                countryCode: iteratee.alpha3Code,
                callingCode
            }));
        }

        return callingCodes;
    }
};

/**
 * 
 * @param {object} properties
 *      Properties
 *          -   code
 *          -   name
 *          -   capital
 *          -   translations
 */
CountriesModel.build = (properties) => new CountriesModel(properties);

/**
 * Mapper build country model
 *  
 * @param {object} restProperties
 *      Map propeties:
 *          -   alpha3Code
 *          -   name
 *          -   capital
 *          -   translations 
 */
CountriesModel.mapperBuild = (restProperties) => CountriesModel.build(morphism(CountrySchemaModel, restProperties));