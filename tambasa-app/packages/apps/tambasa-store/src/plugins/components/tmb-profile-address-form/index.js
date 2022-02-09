import {
  PAGE_ACCOUNT_ADDRESS_BOOK_LINK,
  PAGE_ADDRESS_BOOK_LINK,
  VALIDATION_CONFIG,
  VALIDATION_CONFIG_PROFILEADDRESSMANAGER
} from '@oracle-cx-commerce/commerce-utils/constants';
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { isEmptyObject, searchStringToQueryParams } from '@oracle-cx-commerce/utils/generic';

import Checkbox from '@oracle-cx-commerce/react-components/checkbox';
import Form from '@oracle-cx-commerce/react-components/form';
import ProfileAddressInput from './components/profile-address-input';
import { StoreContext } from '@oracle-cx-commerce/react-ui/contexts';
import Styled from '@oracle-cx-commerce/react-components/styled';
import { connect } from '@oracle-cx-commerce/react-components/provider';
import css from './styles.css';
import { fetchShippingCountries } from '@oracle-cx-commerce/fetchers/shipping-countries';
import { getComponentData } from './selectors';
import { setCustomValidity } from '@oracle-cx-commerce/react-components/utils/address';
import { useNavigator } from '@oracle-cx-commerce/react-components/link';
import { useShippingCountriesFetcher } from '@oracle-cx-commerce/fetchers/shipping-countries/hooks';
import PropTypes from 'prop-types';

/**
 * export fetchers to load all shipping countries into the state during server-side rendering.
 */
export const fetchers = [fetchShippingCountries];

/**
 * widget to Create or Edit a profile address.
 * @param {Object} props the properties object
 */
const ProfileAddressForm = props => {
  const store = useContext(StoreContext);
  const { action } = store;

  /**
   * invoke fetcher hook to load all shipping countries into state,
   * this will not perform any task if state already has shipping countries
   * This is effective if SSR didn't populate the state with shipping countries data
   */
  useShippingCountriesFetcher(store);

  const {
    headingAddAddress,
    headingEditAddress,
    headingEditProfileAddress,
    headingAddProfileAddress,
    textAllFieldsRequired,
    labelMakeDefaultShippingAddress,
    labelCancel,
    labelSave,
    textInvalidField,
    textRequiredField,
    alertAddressChangedSuccessfully,
    alertAddressCreatedSuccessfully
  } = props;

  const {
    id,
    currentPageId,
    onActionComplete,
    contactInfos = [],
    shippingCountries = [],
    defaultShippingAddressId,
    editingAddresId,
    isB2BUser = false
  } = props;

  const goToPage = useNavigator();
  const [inProgress, setInProgress] = useState(false);
  const profileAddressFormRef = useRef({});
  const addressId = editingAddresId;
  const isProfileAddress = true;
  const [address, setAddress] = useState({});

  useEffect(() => {
    // eslint-disable-next-line spellcheck/spell-checker
    /* This check is for b2b-copy-as-profile-address feature.
     * When an address is not available in contactInfos, trigger the action to pull.
     */
    if (addressId && !isEmptyObject(contactInfos)) {
      if (contactInfos[addressId]) {
        setAddress(contactInfos[addressId]);
      } else {
        action(isProfileAddress === true || !isB2BUser ? 'getProfileAddress' : 'getOrganizationAddress', {
          addressId
        });
      }
    }
  }, [addressId, shippingCountries, contactInfos, isProfileAddress, isB2BUser, action]);

  const onOk = useCallback(() => {
    const message =
      addressId && !currentPageId.includes('isProfileAddress')
        ? alertAddressChangedSuccessfully
        : alertAddressCreatedSuccessfully;

    action('notify', { level: 'success', message });
    if (onActionComplete) {
      onActionComplete();
    } else {
      props.setCurrentPage("main")
    }
  }, [
    action,
    addressId,
    alertAddressChangedSuccessfully,
    alertAddressCreatedSuccessfully,
    currentPageId,
    goToPage,
    isB2BUser,
    onActionComplete
  ]);

  const onNotOk = useCallback(
    ({ error = {} }) => {
      if (onActionComplete) onActionComplete();
      action('notify', { level: 'error', message: error.message });
    },
    [action, onActionComplete]
  );

  const getFormControlElement = namedItem => {
    return (
      profileAddressFormRef.current &&
      profileAddressFormRef.current.querySelectorAll &&
      profileAddressFormRef.current.querySelectorAll('form') &&
      profileAddressFormRef.current.querySelectorAll('form')[0] &&
      profileAddressFormRef.current.querySelectorAll('form')[0].elements &&
      profileAddressFormRef.current.querySelectorAll('form')[0].elements.namedItem(namedItem)
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

  const onInputChange = useCallback(
    event => {
      const prop = {};
      const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
      prop[event.target.name] = value;
      setAddress({ ...address, ...prop });
    },
    [address]
  );

  return (
    <Styled id="ProfileAddressForm" css={css}>
      <div className="ProfileAddressForm">
        {isB2BUser ? (
          <h1>
            {addressId && !currentPageId.includes('isProfileAddress')
              ? headingEditProfileAddress
              : headingAddProfileAddress}
          </h1>
        ) : (
          <h1>{addressId ? headingEditAddress : headingAddAddress}</h1>
        )}
        <div className="ProfileAddressForm__AllFieldsRequiredText" aria-label={textAllFieldsRequired}>
          {textAllFieldsRequired}
        </div>
        <div ref={profileAddressFormRef}>
          <Form
            action={
              addressId && !currentPageId.includes('isProfileAddress') ? 'updateProfileAddress' : 'createProfileAddress'
            }
            onOk={onOk}
            onNotOk={onNotOk}
            setCustomValidity={onFormSubmit}
            setInProgress={setInProgress}
            noValidate
            enableUnsavedChangesTracking={true}
          >
            <input type="hidden" name="addressId" value={addressId || ''} />
            <ProfileAddressInput
              {...props}
              id={id}
              address={address}
              validationConfig={isB2BUser ? VALIDATION_CONFIG_PROFILEADDRESSMANAGER : VALIDATION_CONFIG}
              onInputChange={onInputChange}
              onInputBlur={onInputBlur}
              countryList={shippingCountries}
            ></ProfileAddressInput>
            {!isB2BUser && (
              <Checkbox
                id={id}
                name="isDefaultShippingAddress"
                className="ProfileAddressInput__Checkbox"
                labelText={labelMakeDefaultShippingAddress}
                value={address.isDefaultShippingAddress}
                defaultValue={addressId && addressId === defaultShippingAddressId}
                defaultChecked={addressId && addressId === defaultShippingAddressId}
                onChange={onInputChange}
                onBlur={onInputBlur}
                disabled={
                  (VALIDATION_CONFIG.isDefaultShippingAddress && VALIDATION_CONFIG.isDefaultShippingAddress.disabled) ||
                  false
                }
              ></Checkbox>
            )}
            <div className="ProfileAddressForm__Buttons">
              <button
                type="submit"
                className="ProfileAddressForm__ConfirmButton"
                disabled={inProgress}
                aria-label={labelSave}
              >
                {labelSave}
              </button>
              <button
                disabled={inProgress}
                type="button"
                className="ProfileAddressForm__CancelButton secondary"
                onClick={() =>
                  onActionComplete
                    ? onActionComplete()
                    : props.setCurrentPage("main")
                }
                aria-label={labelCancel}
              >
                {labelCancel}
              </button>
            </div>
          </Form>
        </div>
      </div>
    </Styled>
  );
};

ProfileAddressForm.propTypes = {
  /** Address id to update */
  id: PropTypes.string,

  /** Current page id */
  currentPageId: PropTypes.string.isRequired,

  /** Function to invoke on successfully completion of address action */
  onActionComplete: PropTypes.func,

  /** Default shipping address id */
  defaultShippingAddressId: PropTypes.string,

  // eslint-disable-next-line spellcheck/spell-checker
  /**
   * The contactInfos (address) object from redux state(ProfileRepository->contactInfos)
   */
  contactInfos: PropTypes.objectOf(
    PropTypes.shape({
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      address1: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      state: PropTypes.string.isRequired,
      postalCode: PropTypes.string.isRequired,
      country: PropTypes.string.isRequired,
      phoneNumber: PropTypes.string.isRequired
    })
  ),

  /** The countries object from redux state(countryRegionRepository->shippingCountries) */
  shippingCountries: PropTypes.objectOf(
    PropTypes.shape({
      countryCode: PropTypes.string.isRequired,
      displayName: PropTypes.string.isRequired,
      repositoryId: PropTypes.string.isRequired,
      regions: PropTypes.shape.isRequired
    })
  )
};

ProfileAddressForm.defaultProps = {
  id: '',
  defaultShippingAddressId: undefined,
  onActionComplete: undefined,
  contactInfos: {},
  shippingCountries: {}
};

export default connect(getComponentData)(ProfileAddressForm);
