import {noop} from '@oracle-cx-commerce/utils/generic';
import {
  getAddressManagerRoles,
  updateShippingAddressInShippingGroup
} from '@oracle-cx-commerce/react-components/utils/address';
import React, {useMemo, useCallback, useContext} from 'react';
import {StoreContext} from '@oracle-cx-commerce/react-ui/contexts';
import ShippingCartItemDetails from '../shipping-cart-item-details';
import AddressInformation from '../address-information';
import ShippingOptions from '../shipping-options';
import Styled from '@oracle-cx-commerce/react-components/styled';
import css from './styles.css';
import PropTypes from 'prop-types';

/**
 * Component to display the details of a shipping group
 * It displays the shipping group item details, shipping group address, an option to add a new shipping address and shipping options
 * @param props
 */
const ShippingGroupDetails = props => {
  //resources
  const {
    alertShippingGroupUpdated,
    alertAddressCreatedSuccessfully,
    alertAddressChangedSuccessfully,
    labelEdit,
    headingAddShippingAddress,
    headingEditShippingAddress,
    headingShippingOptions,
    headingShippingTo,
    labelShippingOptions,
    textEnterAShippingAddress,
    textNoShippingMethods
  } = props;

  const {
    shippingCountries,
    shippingGroup = {},
    commerceItems = {},
    shippingDeliveryIndex = '',
    isUserLoggedIn,
    shippingMethodSelectorType,
    isB2BUser,
    roles,
    showEdit = false,
    onEditClick = noop,
    isMultiShipping = false,
    currentOrder = {},
    currentProfile
  } = props;

  const {priceInfo = {amount: 0}} = currentOrder;
  const {shippingGroupId, shippingAddress = {}, shippingMethod = {}} = shippingGroup;

  const addressManagerRoles = useMemo(() => getAddressManagerRoles(roles), [roles]);
  const store = useContext(StoreContext);

  const dynamicProperty = currentProfile.dynamicProperties && currentProfile.dynamicProperties.find(dp => dp.id === "tam_isB2B_user")
  const tamIsB2B = dynamicProperty && dynamicProperty.value

  const shouldDisplayAddNewAddressLink = () => {
    if (isUserLoggedIn) {
      if (isB2BUser) {
        if (
          addressManagerRoles.isProfileAddrManager ||
          addressManagerRoles.isAccountAddrManager ||
          addressManagerRoles.isAdmin
        ) {
          return true;
        }

        // Buyer Role
        return false;
      }

      // B2C user
      return true;
    }

    // Guest user
    return false;
  };

  /**
   *  Called when address is updated through address-form modal or address-book modal
   */
  const onAddressUpdated = useCallback(
    ({address = {}, handleCloseAction = noop, isEditAddress}) => {
      /* When new address is added to shipping group, display proper notification */
      let message = alertShippingGroupUpdated;
      if (isEditAddress === true) {
        message = alertAddressChangedSuccessfully;
      }
      if (isEditAddress === false) {
        message = alertAddressCreatedSuccessfully;
      }
      updateShippingAddressInShippingGroup(store, {
        shippingGroup,
        shippingAddress: address,
        alertShippingGroupUpdated: message,
        handleCloseAction,
        fetchShippingMethods: true
      });
    },
    [alertAddressChangedSuccessfully, alertAddressCreatedSuccessfully, alertShippingGroupUpdated, shippingGroup, store]
  );

  return (
    <Styled id="ShippingGroupDetails" css={css}>
      <div className="ShippingGroupDetails">
        {((shippingGroup || {}).items || []).length > 0 && (
          <>
            <div className="ShippingGroupDetails__Wrapper">
              <div className="ShippingGroupDetails__ShippingGroupData">
                <div className="ShippingGroupDetails__HeadingContainer">
                  {showEdit && (
                    <button className="ShippingGroupDetails__EditButton" type="button" onClick={onEditClick}>
                      {labelEdit}
                    </button>
                  )}
                </div>

                <ShippingCartItemDetails
                  shippingGroup={shippingGroup}
                  commerceItems={commerceItems}
                  isMultiShipping={isMultiShipping}
                  shippingDeliveryIndex={shippingDeliveryIndex}
                  {...props}
                />
                <AddressInformation
                  address={shippingAddress}
                  headingAddress={headingShippingTo}
                  headingEditAddress={headingEditShippingAddress}
                  countries={shippingCountries}
                  onAddressUpdated={onAddressUpdated}
                  shouldDisplayAddNewAddressLink={shouldDisplayAddNewAddressLink()}
                  tamIsB2B={tamIsB2B}
                  {...props}
                />
              </div>
            </div>

            <ShippingOptions
              shippingAddress={shippingAddress}
              shippingGroupId={shippingGroupId}
              shippingMethod={shippingMethod}
              isB2BUser={isB2BUser}
              shippingDeliveryIndex={shippingDeliveryIndex}
              shippingMethodSelectorType={shippingMethodSelectorType}
              {...{
                cartAmount: priceInfo.amount,
                headingShippingOptions,
                labelShippingOptions,
                textEnterAShippingAddress,
                textNoShippingMethods
              }}
              {...props}
            />
          </>
        )}
      </div>
    </Styled>
  );
};

ShippingGroupDetails.propTypes = {
  /**
   * This is the default shipping country code
   */
  defaultShippingCountry: PropTypes.string,

  /** The countries object from redux state(countryRegionRepository->shippingCountries) */
  shippingCountries: PropTypes.objectOf(
    PropTypes.shape({
      countryCode: PropTypes.string.isRequired,
      displayName: PropTypes.string.isRequired,
      repositoryId: PropTypes.string.isRequired,
      regions: PropTypes.shape.isRequired
    })
  ),

  /**
   * Shipping Group
   */
  shippingGroup: PropTypes.shape({
    shippingGroupId: PropTypes.string.isRequired,
    shippingAddress: PropTypes.shape({
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      address1: PropTypes.string,
      city: PropTypes.string,
      state: PropTypes.string,
      postalCode: PropTypes.string,
      country: PropTypes.string,
      phoneNumber: PropTypes.string
    }),
    shippingMethod: PropTypes.shape({})
  }).isRequired,

  /**
   * Commerce Items.
   */
  commerceItems: PropTypes.objectOf(PropTypes.object),

  /**
   * Shipping Group index.
   */
  shippingDeliveryIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

  /**
   * Logged in status of the user.
   */
  isUserLoggedIn: PropTypes.bool.isRequired,

  /**
   * Type of the UI element to display shipping options.
   */
  shippingMethodSelectorType: PropTypes.string.isRequired,

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

  /**
   * Flag to know if edit link to be displayed
   */
  showEdit: PropTypes.bool,

  /** Callback function to handle edit link click  */
  onEditClick: PropTypes.func,

  /**
   * Flag to know if this component is rendered for multi-shipping-widget
   */
  isMultiShipping: PropTypes.bool
};

ShippingGroupDetails.defaultProps = {
  defaultShippingCountry: '',
  shippingCountries: {},
  shippingDeliveryIndex: '',
  showEdit: undefined,
  onEditClick: noop,
  isMultiShipping: undefined,
  commerceItems: {},
  roles: []
};

export default React.memo(ShippingGroupDetails);
