import React, {useEffect, useMemo, useState} from 'react';
import {
  getDefaultCountry,
  getSortedArray
} from '@oracle-cx-commerce/react-components/utils/address';
import Dropdown from '@oracle-cx-commerce/react-components/dropdown';
import Phone from '@oracle-cx-commerce/react-components/icons/phone';
import Styled from '@oracle-cx-commerce/react-components/styled';
import css from './styles.css';

/**
 * Component for common address form fields.
 * @param {Object} props the properties object
 */
const AddressInput = props => {

  const {
    labelCountry,
    labelZipCode,
    labelState,
    labelStreetAddress,
    labelTownCity,
    labelPhoneNumberOptional,
    LabelNeighboorhood,
    LabelNumber,
    LabelComplement
  } = props;

  const {
    id = '',
    className = '',
    address = {},
    validationConfig = {},
    onInputChange,
    onInputBlur,
    defaultCountry,
    countryList = {},
    showPhoneNumberField = true
  } = props;
  const [regions, setRegions] = useState([]);

  /**
   * Sets the valid country
   */
  const country = useMemo(() => {
    return address.country || getDefaultCountry(countryList, defaultCountry);
  }, [address.country, countryList, defaultCountry]);

  /**
   * Function return options array sorted by displayName
   * @param {Object} items The array of countries/ regions
   * @param {String} valueField field name on which the sort is performed
   * @returns {Array} sorted array of options
   */
  const getSortedOptions = (items, valueField) => {
    const sortBy = 'displayName';

    return getSortedArray(items, sortBy).map(item => (
      <option tabIndex={0} value={item[valueField]} key={item[valueField]} aria-label={item[sortBy]}>
        {item[sortBy]}
      </option>
    ));
  };

  /**
   * Sets the regions based on country/ default-country
   */
  useEffect(() => {
    if (country && Object.keys(countryList).length) {
      setRegions(countryList[country].regions);
    }
  }, [address, country, countryList, defaultCountry]);

  return (
    <Styled css={css} id="AddressInput">
      <div className={`AddressInput ${className}`}>
        <div className="AddressInput__Field AddressInput__CountryStateZipCodeContainer">
          <div className="AddressInput__Country">
            <Dropdown
              label={labelCountry}
              id={`country-${id}`}
              data-testid={`country-${id}`}
              name="country"
              value={address.country || country}
              onChange={onInputChange}
              onBlur={onInputBlur}
              required
              autoComplete="country-name"
              disabled={(validationConfig.country && validationConfig.country.disabled) || false}
            >
              {getSortedOptions(countryList, 'countryCode')}
            </Dropdown>
          </div>
          <div className="AddressInput__ZipCode">
            <label htmlFor={`postalCode-${id}`} aria-label={labelZipCode}>
              {labelZipCode}
            </label>
            <input
              id={`postalCode-${id}`}
              data-testid={`postalCode-${id}`}
              type="text"
              name="postalCode"
              value={address.postalCode || ''}
              onChange={onInputChange}
              onBlur={onInputBlur}
              required
              autoComplete="postal-code"
              maxLength={(validationConfig.postalCode && validationConfig.postalCode.maxLength) || '10'}
              disabled={(validationConfig.postalCode && validationConfig.postalCode.disabled) || false}
            />
            <span className="validationMessage"></span>
          </div>
          <div className="AddressInput__State">
            <Dropdown
              label={labelState}
              id={`state-${id}`}
              data-testid={`state-${id}`}
              name="state"
              value={address.state}
              onChange={onInputChange}
              onBlur={onInputBlur}
              required
              autoComplete="address-level1"
              disabled={(validationConfig.state && validationConfig.state.disabled) || regions.length === 0 || false}
            >
              {getSortedOptions(regions, 'abbreviation')}
            </Dropdown>
          </div>
        </div>
        <div className="AddressInput__Field AddressInput__StreetAddressTownCityContainer">
          <div className="AddressInput__Field AddressInput__StreetAddress">
            <label htmlFor={`address1-${id}`} aria-label={labelStreetAddress}>
              {labelStreetAddress}
            </label>
            <input
              id={`address1-${id}`}
              data-testid={`address1-${id}`}
              type="text"
              name="address1"
              value={address.address1 || ''}
              onChange={onInputChange}
              onBlur={onInputBlur}
              required
              autoCapitalize="words"
              autoComplete="street-address"
              maxLength={(validationConfig.address1 && validationConfig.address1.maxLength) || '60'}
              disabled={(validationConfig.address1 && validationConfig.address1.disabled) || false}
            />
            <span className="validationMessage"></span>
          </div>
          <div className="AddressInput__Field AddressInput__TownCity">
            <label htmlFor={`city-${id}`} aria-label={labelTownCity}>
              {labelTownCity}
            </label>
            <input
              id={`city-${id}`}
              data-testid={`city-${id}`}
              type="text"
              name="city"
              value={address.city || ''}
              onChange={onInputChange}
              onBlur={onInputBlur}
              required
              autoCapitalize="words"
              autoComplete="address-level2"
              maxLength={(validationConfig.city && validationConfig.city.maxLength) || '50'}
              disabled={(validationConfig.city && validationConfig.city.disabled) || false}
            />
            <span className="validationMessage"></span>
          </div>
        </div>
        {showPhoneNumberField && (
          <div className="AddressInput__Field AddressInput__PhoneNumber">
            <label htmlFor={`phoneNumber-${id}`} aria-label={labelPhoneNumberOptional}>
              {labelPhoneNumberOptional}
            </label>
            <input
              id={`phoneNumber-${id}`}
              type="tel"
              name="phoneNumber"
              value={address.phoneNumber || ''}
              onChange={onInputChange}
              onBlur={onInputBlur}
              autoComplete="tel"
              maxLength={(validationConfig.phoneNumber && validationConfig.phoneNumber.maxLength) || '15'}
              disabled={(validationConfig.phoneNumber && validationConfig.phoneNumber.disabled) || false}
              pattern={(validationConfig.phoneNumber && validationConfig.phoneNumber.pattern) || '[0-9]*'}
            />
            <span className="validationMessage"></span>
            <Phone className="AddressInput__PhoneIcon" />
          </div>
        )}

        {/* Bairro */}
        <div className="AddressInput__Field AddressInput__Neighboorhood">
          <label htmlFor={`neighboor-${id}`} aria-label={LabelNeighboorhood}>
            {LabelNeighboorhood}
          </label>
          <input
            id={`county-${id}`}
            type="text"
            name="county"
            value={address.county || ''}
            onChange={onInputChange}
          />
          {/* <span className="validationMessage"></span> */}
        </div>

        {/* Número */}
        <div className="AddressInput__Field AddressInput__Number">
          <label htmlFor={`number-${id}`} aria-label={LabelNumber}>
            {LabelNumber}
          </label>
          <input
            id={`address2-${id}`}
            type="text"
            name="address2"
            value={address.address2 || ''}
            onChange={onInputChange}
          />
          <span className="validationMessage"></span>
        </div>

        {/* Complemento */}
        <div className="AddressInput__Field AddressInput__Complement">
          <label htmlFor={`complement-${id}`} aria-label={LabelComplement}>
            {LabelComplement}
          </label>
          <input
            id={`address3-${id}`}
            type="text"
            name="address3"
            value={address.address3 || ''}
            onChange={onInputChange}
            // onBlur={onInputBlur}
            // autoComplete="tel"
            // maxLength={(validationConfig.phoneNumber && validationConfig.phoneNumber.maxLength) || '15'}
            // disabled={(validationConfig.phoneNumber && validationConfig.phoneNumber.disabled) || false}
            // pattern={(validationConfig.phoneNumber && validationConfig.phoneNumber.pattern) || '[0-9]*'}
          />
          <span className="validationMessage"></span>
        </div>
      </div>
    </Styled>
  );
};

export default AddressInput;
