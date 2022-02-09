import {
  PAGE_CHECKOUT_SHIPPING_LINK,
  VALIDATION_CONFIG,
  VALIDATION_CONFIG_BUYER,
  VALIDATION_CONFIG_PROFILEADDRESSMANAGER
} from '@oracle-cx-commerce/commerce-utils/constants';
import React, {useCallback, useContext, useEffect, useMemo, useRef, useState} from 'react';
import {
  getAddressManagerRoles,
  getDefaultCountry,
  getSortedArray,
  setCustomValidity
} from '@oracle-cx-commerce/react-components/utils/address';
import {isEmptyObject, noop} from '@oracle-cx-commerce/utils/generic';

import Checkbox from '@oracle-cx-commerce/react-components/checkbox';
import Form from '@oracle-cx-commerce/react-components/form';
import ProfileAddressInput from '../profile-address-input';
import {StoreContext} from '@oracle-cx-commerce/react-ui/contexts';
import Styled from '@oracle-cx-commerce/react-components/styled';
import css from './styles.css';
import PropTypes from 'prop-types';

//constants
import {formToJson} from '@oracle-cx-commerce/react-components/utils';
import {useNavigator} from '@oracle-cx-commerce/react-components/link';

/**
 * Component to render add or edit shipping address/ billing address form
 * @param {Object} props the properties object
 */
const AddressForm = props => {
  // resources
  const {
    textAllFieldsRequired,
    labelSaveAsANewProfileAddress,
    labelSaveAsANewAccountAddress,
    labelCancel,
    buttonSaveAndContinue,
    textRequiredField,
    textInvalidField
  } = props;

  const {
    id,
    isUserLoggedIn,
    isB2BUser,
    roles,
    countries = {},
    defaultCountry,
    address: existingAddress,
    isEditAddress,
    handleCloseAction = noop,
    onAddressUpdated = noop
  } = props;

  const store = useContext(StoreContext);
  const {action} = store;

  const goToPage = useNavigator();
  const addressFormRef = useRef({});
  const [address, setAddress] = useState({});

  const addressManagerRoles = useMemo(() => getAddressManagerRoles(roles), [roles]);

  /* For B2C user, checkbox will be default checked */
  const [saveAsANewProfileAddress, setSaveAsANewProfileAddress] = useState(isUserLoggedIn && !isB2BUser);
  const [saveAsANewAccountAddress, setSaveAsANewAccountAddress] = useState(false);

  /**
   * Returns  default billing country and region
   */
  const getDefaultCountryRegion = useCallback(() => {
    // Sets country to the defaultCountry or the  first country in the countries list
    let state = '',
      country = '',
      stateList = [];
    if (countries) {
      country = getDefaultCountry(countries, defaultCountry);
      // get region according to the default country
      stateList = countries[country] ? countries[country].regions : [];
      state = stateList.length > 0 ? getSortedArray(stateList, 'displayName')[0].abbreviation : '';
    }

    return {country, state};
  }, [countries, defaultCountry]);

  /**
   * Sets the address into local state when performing edit operation
   */
  useEffect(() => {
    if (isEditAddress) {
      setAddress({...existingAddress, addressType: existingAddress.addressType || existingAddress.alias});
    } else if (!isEmptyObject(countries)) {
      // set country,state according to default country
      const {state, country} = getDefaultCountryRegion();
      setAddress(address => {
        return {
          ...address,
          state,
          country
        };
      });
    }
  }, [isEditAddress, existingAddress, countries, getDefaultCountryRegion]);

  /**
   * Form Validation config based on the user role
   */
  const getValidationConfig = () => {
    if (isB2BUser) {
      if (addressManagerRoles.isAccountAddrManager || addressManagerRoles.isAdmin) {
        if (saveAsANewAccountAddress) {
          return VALIDATION_CONFIG;
        }

        return VALIDATION_CONFIG_PROFILEADDRESSMANAGER;
      }
      if (addressManagerRoles.isProfileAddrManager) {
        return VALIDATION_CONFIG_PROFILEADDRESSMANAGER;
      }
      /* If buyer edits an address, disable all fields except fName and lName */
      if (isEditAddress) {
        return VALIDATION_CONFIG_BUYER;
      }
    }

    return VALIDATION_CONFIG;
  };

  /**
   * Failure callback for the action
   */
  const onNotOk = useCallback(
    ({error = {}}) => {
      action('notify', {level: 'error', message: error.message});
    },
    [action]
  );

  /**
   * Handler for Form submit
   * @param {*} props
   */
  const handleAddOrEditAddress = event => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.target;
    action('notifyClearAll');

    if (form.checkValidity()) {
      const formData = formToJson(form);
      const {saveAsANewProfileAddress, saveAsANewAccountAddress, ...remainingAddressFields} = formData;
      let addressDetails = remainingAddressFields;
      const {addressType} = addressDetails;
      if (isB2BUser) {
        addressDetails = {...addressDetails, alias: addressType};
      }

      if (saveAsANewProfileAddress) {
        action('createProfileAddress', {...addressDetails})
          .then(response => {
            if (response.ok === false) {
              onNotOk(response);
            }
          })
          .catch(() => {
            onNotOk();
          });
      }

      if (saveAsANewAccountAddress) {
        action('addOrganizationAddress', {...addressDetails})
          .then(response => {
            if (response.ok === false) {
              onNotOk(response);
            }
          })
          .catch(() => {
            onNotOk();
          });
      }

      // The entered address need to be passed back to the parent component, whenever it is updated.
      onAddressUpdated({address: addressDetails, handleCloseAction, isEditAddress});
    }

    /* Form component expects false from onsubmit handler */
    return false;
  };

  const getFormControlElement = namedItem => {
    return (
      addressFormRef.current &&
      addressFormRef.current.querySelectorAll &&
      addressFormRef.current.querySelectorAll('form') &&
      addressFormRef.current.querySelectorAll('form')[0] &&
      addressFormRef.current.querySelectorAll('form')[0].elements &&
      addressFormRef.current.querySelectorAll('form')[0].elements.namedItem(namedItem)
    );
  };

  /**
   * Validate postalCode when country changes
   */
  useEffect(() => {
    const postalCodeEl = getFormControlElement('postalCode');
    const countryEl = getFormControlElement('country');
    if (postalCodeEl && postalCodeEl.value !== '') {
      const country = countryEl ? countryEl.value : '';
      setCustomValidity(postalCodeEl, textInvalidField, textRequiredField, country);
    }
  }, [address.country, textInvalidField, textRequiredField]);

  /**
   * Validate NickName and CompanyName when save as account address changes
   */
  useEffect(() => {
    if (addressManagerRoles.isAccountAddrManager || addressManagerRoles.isAdmin) {
      const addressTypeEl = getFormControlElement('addressType');
      const companyNameEl = getFormControlElement('companyName');
      const countryEl = getFormControlElement('country');
      const country = countryEl ? countryEl.value : '';
      if (addressTypeEl) {
        setCustomValidity(addressTypeEl, textInvalidField, textRequiredField, country);
      }
      if (companyNameEl) {
        setCustomValidity(companyNameEl, textInvalidField, textRequiredField, country);
      }
    }
  }, [
    addressManagerRoles.isAccountAddrManager,
    addressManagerRoles.isAdmin,
    saveAsANewAccountAddress,
    textInvalidField,
    textRequiredField
  ]);

  const onFormSubmit = useCallback(
    event => {
      const countryEl = getFormControlElement('country');
      const country = countryEl ? countryEl.value : '';
      setCustomValidity(event, textInvalidField, textRequiredField, country);
    },
    [textInvalidField, textRequiredField]
  );

  const onInputBlur = useCallback(
    event => {
      const countryEl = getFormControlElement('country');
      const country = countryEl ? countryEl.value : '';
      setCustomValidity(event.target, textInvalidField, textRequiredField, country);
    },
    [textInvalidField, textRequiredField]
  );

  const validateAndFixElementValue = (element, value) => {
    const name = element.name
    switch(name) {
      case "address2":
        element.value = value.replace(/\D/gi, "")
      default: 
        break
    }

    return element.type === 'checkbox' 
      ? element.checked 
      : element.value
  }
    
  /**
   * Function to handle the onChange event callback
   */
  const onInputChange = useCallback(
    event => {
      const prop = {};
      prop[event.target.name] = validateAndFixElementValue(event.target, event.target.value);
      setAddress({...address, ...prop});
    },
    [address]
  );

  return (
    <Styled id="AddressForm" css={css}>
      <div className="AddressForm">
        <div className="AddressForm__AllFieldsRequiredText" aria-label={textAllFieldsRequired}>
          {textAllFieldsRequired}
        </div>
        <div ref={addressFormRef}>
          <Form onSubmit={handleAddOrEditAddress} setCustomValidity={onFormSubmit} noValidate>
            <div>
              <ProfileAddressInput
                {...props}
                countryList={countries}
                address={address}
                onInputChange={onInputChange}
                onInputBlur={onInputBlur}
                validationConfig={getValidationConfig()}
              ></ProfileAddressInput>
              {isUserLoggedIn && (
                <div className="AddressForm__Field">
                  {(!isB2BUser || addressManagerRoles.isProfileAddrManager) && (
                    <Checkbox
                      id={`saveAsANewProfileAddress-${id}`}
                      name="saveAsANewProfileAddress"
                      className="AddressForm_SaveAsANewProfileAddressCheckBox"
                      labelText={labelSaveAsANewProfileAddress}
                      checked={saveAsANewProfileAddress}
                      value={saveAsANewProfileAddress}
                      onChange={event => {
                        setSaveAsANewProfileAddress(event.target.checked);
                      }}
                    ></Checkbox>
                  )}
                  {isB2BUser && (addressManagerRoles.isAccountAddrManager || addressManagerRoles.isAdmin) && (
                    <Checkbox
                      id={`saveAsANewAccountAddress-${id}`}
                      name="saveAsANewAccountAddress"
                      className="AddressForm_SaveAsANewAccountAddressCheckBox"
                      labelText={labelSaveAsANewAccountAddress}
                      checked={saveAsANewAccountAddress}
                      value={saveAsANewAccountAddress}
                      onChange={event => {
                        setSaveAsANewAccountAddress(event.target.checked);
                      }}
                    ></Checkbox>
                  )}
                </div>
              )}
              <div className="AddressForm__Buttons">
                <button type="submit" className="AddressForm__ConfirmButton" aria-label={buttonSaveAndContinue}>
                  {buttonSaveAndContinue}
                </button>
                <button
                  type="button"
                  className="AddressForm__CancelButton secondary"
                  aria-label={labelCancel}
                  onClick={() => (handleCloseAction ? handleCloseAction() : goToPage(PAGE_CHECKOUT_SHIPPING_LINK))}
                >
                  {labelCancel}
                </button>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </Styled>
  );
};

AddressForm.propTypes = {
  /**
   * Logged in status of the user.
   */
  isUserLoggedIn: PropTypes.bool.isRequired,

  /**
   * Type of the shopper.
   */
  isB2BUser: PropTypes.bool.isRequired,

  /**
   * The roles (user roles) object from redux state(ProfileRepository->roles)
   */
  roles: PropTypes.arrayOf(
    PropTypes.shape({
      repositoryId: PropTypes.string.isRequired,
      function: PropTypes.string.isRequired
    })
  ),

  /** The countries object from redux state(countryRegionRepository->shippingCountries) */
  countries: PropTypes.objectOf(
    PropTypes.shape({
      countryCode: PropTypes.string.isRequired,
      displayName: PropTypes.string.isRequired,
      repositoryId: PropTypes.string.isRequired,
      regions: PropTypes.shape.isRequired
    })
  ),

  /**
   * This is the default shipping country code
   */
  defaultCountry: PropTypes.string,

  /**
   * This is the address object for edit
   */
  address: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    address1: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    postalCode: PropTypes.string,
    country: PropTypes.string,
    phoneNumber: PropTypes.string
  }),

  /**
   * Flag to know if address form is opened to edit an address
   */
  isEditAddress: PropTypes.bool.isRequired,

  /** Callback function to handle modal close  */
  handleCloseAction: PropTypes.func.isRequired,

  /** Callback function to handle save or update address */
  onAddressUpdated: PropTypes.func.isRequired
};

AddressForm.defaultProps = {
  address: {},
  countries: {},
  defaultCountry: '',
  roles: []
};

export default React.memo(AddressForm);
