import React, {useContext} from 'react';
import Styled from '@oracle-cx-commerce/react-components/styled';
import Link from '@oracle-cx-commerce/react-components/link';
import css from './styles.css';

import AddNewAddress from '../../../tmb-checkout-single-shipping-details/components/add-new-address';
import {PAGE_CHECKOUT_SHIPPING_LINK} from '@oracle-cx-commerce/commerce-utils/constants';
import {ContainerContext} from '@oracle-cx-commerce/react-ui/contexts';


/**
 * Following component renders Address Details
 * @param props
 */

export const HomeDeliveryAddressInformation = props => {
  const {address = {}, shippingInfoLabel, textSelectedShippingAddress, currentPage} = props;
  const {firstName, lastName, address1, address2, city, state, postalCode, country} = address;

  const { 
    shouldDisplayAddNewAddressLink,
    openAddressFormModal,
    openAddressBookModal,
    isUserLoggedIn,
    tamIsB2B,
    showEditLink = false
  } = props

  // resources
  const {
    labelEditAddress,
    labelOpenAddressBook,
    labelEdit
  } = props

  const isReviewOrderPage = currentPage && currentPage.path
    && currentPage.path === 'checkout-review-order'

    //To get place order initiation status
  const {isPlaceOrderInitiated = false} = useContext(ContainerContext) || {};

  const SHIPPING_ADDRESS_URL = PAGE_CHECKOUT_SHIPPING_LINK;

  return (
    <Styled id="HomeDeliveryAddressInformation" css={css}>
      <div className="HomeDeliveryAddressInformation__Address">
        <div className="HomeDeliveryAddressInformation__Heading__Container">
          <div className="HomeDeliveryAddressInformation__Heading___Text">{shippingInfoLabel}</div>
          { shouldDisplayAddNewAddressLink
            && !isReviewOrderPage
            && !tamIsB2B
            && <AddNewAddress {...props}/>
          }
          {
            isReviewOrderPage && 
            showEditLink && (
              <div
                className={
                  !isPlaceOrderInitiated
                    ? 'TmbShippingInformation__EditPayment'
                    : 'TmbShippingInformation__EditPayment--disable'
                }
              >
                <Link href={SHIPPING_ADDRESS_URL}>{labelEdit}</Link>
              </div>
            )
          }
        </div>
        <div className="HomeDeliveryAddressInformation__AddressSummary">
          <div className="HomeDeliveryAddressInformation__AddressSummary___Container">
            {textSelectedShippingAddress && (
              <div className="HomeDeliveryAddressInformation__AddressDetails">
                <span className="HomeDeliveryAddressInformation__SelectedShippingAddress">{textSelectedShippingAddress}</span>
              </div>
            )}
            {firstName && (
              <div className="HomeDeliveryAddressInformation__AddressDetails">
                <span className="HomeDeliveryAddressInformation__FirstName">{firstName}</span>
                {lastName && <span className="HomeDeliveryAddressInformation__LastName">{lastName}</span>}
              </div>
            )}
            {address1 && (
              <div className="HomeDeliveryAddressInformation__AddressDetails">
                {address1 && <span>{`${address1},`}</span>}
              </div>
            )}
            {address2 && (
              <div className="HomeDeliveryAddressInformation__AddressDetails">
                {address1 && <span>{`${address2},`}</span>}
              </div>
            )}
            {state && (
              <div className="HomeDeliveryAddressInformation__AddressDetails">
                {city && <span>{city}</span>}
                {state && <span>{state}</span>}
                {postalCode && <span>{postalCode}</span>}
                {country && <span>{country}</span>}
              </div>
            )}
          </div>
          {
            isReviewOrderPage &&
            props.children
          }
          { !isReviewOrderPage &&
            <div className="HomeDeliveryAddressInformation__AddressSummary___Controls">
              <div className="AddressInformation__Buttons">
                {/* Edit Address */}
                { !tamIsB2B &&
                  <button type="button" className="AddressInformation__EditButton" 
                    onClick={openAddressFormModal}>
                    {labelEditAddress}
                  </button>
                }

                {/* Open Address Book */}
                {isUserLoggedIn && (
                  <button
                    type="button"
                    className="AddressInformation__OpenAddressBookButton"
                    onClick={openAddressBookModal}
                  >
                    {labelOpenAddressBook}
                  </button>
                )}
              </div>
            </div>
          }
        </div>
      </div>
    </Styled>
  );
};
