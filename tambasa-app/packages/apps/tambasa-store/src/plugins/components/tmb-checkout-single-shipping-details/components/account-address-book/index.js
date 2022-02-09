/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import React, {useCallback, useContext, useEffect, useState} from 'react';
import Collapsible from '@oracle-cx-commerce/react-components/collapsible';
import CheckoutAddressBookCard from '@oracle-cx-commerce/react-widgets/checkout/checkout-single-shipping-details/components/address-book-card';
import AddressListView from '../address-list-view';
import LoadMore, {LOAD_MORE} from '@oracle-cx-commerce/react-components/load-more';
import {StoreContext} from '@oracle-cx-commerce/react-ui/contexts';
import Styled from '@oracle-cx-commerce/react-components/styled';
import {connect} from '@oracle-cx-commerce/react-components/provider';
import {getComponentData} from './selectors';
import css from './styles.css';
import PropTypes from 'prop-types';

/**
 * Component to list and manage organization addresses.
 * @param {Object} props the properties object
 */
const CheckoutAccountAddressBook = props => {
  //resources
  const {
    textDefaultAddresses,
    textProfileAddresses,
    textInheritedAddresses,
    textAddressesForThisAccount,
    labelNoDefaultAddressesAvailable,
    labelNoProfileAddressesAvailable,
    labelNoAccountAddressesAvailable,
    labelNoInheritedAddressesAvailable,
    textLoadMoreAccountAddress,
    textLoadMoreProfileAddress,
    textLoadMoreInheritedAddress,
    textLoading
  } = props;

  const {contactInfos, currentOrganization, numberOfAddressesToLoad, handleSelectAddress} = props;

  const {action} = useContext(StoreContext);
  const [shippingAddress, setShippingAddress] = useState();
  const [billingAddress, setBillingAddress] = useState();
  const [accountAddressIds, setAccountAddressIds] = useState([]);
  const [profileAddressIds, setProfileAddressIds] = useState([]);
  const [inheritedAddressIds, setInheritedAddressIds] = useState([]);

  const limit = numberOfAddressesToLoad || 12;

  /**
   * A flag to check whether an address is deleted
   */
  const [isProfileAddressDeleted, setIsProfileAddressDeleted] = useState(false);
  const [isAccountAddressDeleted, setIsAccountAddressDeleted] = useState(false);

  /**
   * A flag to reload page when filters applied
   */
  const [resetPage, setResetPage] = useState(false);

  /**
   * Function to trigger the action for pulling addresses
   */
  const actionLoadAddresses = async (actionName, payload, addressIds, setAddressIds) => {
    const response = await action(actionName, payload);
    const recentListingItems = [];
    if (response.ok && response.json && response.json.items) {
      for (const item of response.json.items) {
        recentListingItems.push(item.address['repositoryId']);
      }
      setResetPage(false);
      setAddressIds([...new Set([...addressIds, ...recentListingItems])]);

      return {totalNumberOfItems: response.json.totalResults, currentItemsCount: recentListingItems.length};
    }

    return {};
  };

  const loadProfileAddresses = async payloadOffset => {
    const payload = {limit, offset: payloadOffset};
    if (isProfileAddressDeleted) {
      setIsProfileAddressDeleted(false);
      payload.offset = profileAddressIds.length;
    }

    return actionLoadAddresses('listProfileAddresses', payload, profileAddressIds, setProfileAddressIds);
  };
  const loadAccountAddresses = async payloadOffset => {
    const payload = {limit, offset: payloadOffset};
    if (isAccountAddressDeleted) {
      setIsAccountAddressDeleted(false);
      payload.offset = accountAddressIds.length;
    }

    return actionLoadAddresses('listOrganizationAddresses', payload, accountAddressIds, setAccountAddressIds);
  };
  const loadInheritedAddresses = async payloadOffset => {
    const payload = {limit, include: 'inheritedOnly', offset: payloadOffset};

    return actionLoadAddresses('listOrganizationAddresses', payload, inheritedAddressIds, setInheritedAddressIds);
  };

  /**
   * Triggers the action to get the default organization addresses
   */
  useEffect(() => {
    action('getOrganizationDefaultAddresses');
  }, [action]);

  /**
   * Seed the shipping address and billing address
   */
  useEffect(() => {
    if (currentOrganization) {
      setShippingAddress(currentOrganization.shippingAddress);
      setBillingAddress(currentOrganization.billingAddress);
    }
  }, [currentOrganization]);

  /**
   * Function to handle the callback when Use-This-Address button is clicked
   */
  const selectThisAddress = useCallback(
    addressId => {
      handleSelectAddress(contactInfos[addressId]);
    },
    [contactInfos, handleSelectAddress]
  );

  const getCollapsibleTitle = title => {
    return <h2>{title}</h2>;
  };

  const sortedAddressIds = [];
  /**
   * Function to return array of address id's sorted by lastName, address1
   */
  const getSortedAddressIds = addressIds => {
    if (contactInfos) {
      const sortedIds = addressIds
        .filter(addressId => addressId)
        .sort((a, b) => {
          if (contactInfos[a] && contactInfos[a].lastName && contactInfos[b] && contactInfos[b].lastName) {
            if (contactInfos[a].lastName.toLowerCase() > contactInfos[b].lastName.toLowerCase()) {
              return 1;
            }
            if (contactInfos[a].lastName.toLowerCase() < contactInfos[b].lastName.toLowerCase()) {
              return -1;
            }
          }
          if (
            contactInfos[a] &&
            contactInfos[a].address1 &&
            contactInfos[b] &&
            contactInfos[b].address1 &&
            contactInfos[a].address1.toLowerCase() > contactInfos[b].address1.toLowerCase()
          ) {
            return 1;
          }

          return -1;
        });

      return sortedAddressIds.concat(sortedIds);
    }

    return addressIds;
  };

  return (
    <Styled id="CheckoutAccountAddressBook" css={css}>
      <div className="CheckoutAccountAddressBook">
        <div className="CheckoutAccountAddressBook__AddressesList">
          {/* Default Addresses */}
          <Collapsible expanded={true} title={getCollapsibleTitle(textDefaultAddresses)}>
            <div className="CheckoutAccountAddressBook__List">
              {contactInfos && shippingAddress && contactInfos[shippingAddress] && (
                <CheckoutAddressBookCard
                  {...props}
                  itemId={shippingAddress}
                  shippingAddress={shippingAddress}
                  billingAddress={billingAddress}
                  itemType="ShippingAddress"
                  showShippingBadge={true}
                  showBillingBadge={true}
                  showMoreAction={false}
                  selectThisAddress={selectThisAddress}
                ></CheckoutAddressBookCard>
              )}
              {contactInfos && billingAddress && billingAddress !== shippingAddress && contactInfos[billingAddress] && (
                <CheckoutAddressBookCard
                  {...props}
                  shippingAddress={shippingAddress}
                  billingAddress={billingAddress}
                  itemId={billingAddress}
                  itemType="BillingAddress"
                  showShippingBadge={true}
                  showBillingBadge={true}
                  showMoreAction={false}
                  selectThisAddress={selectThisAddress}
                ></CheckoutAddressBookCard>
              )}
              {!billingAddress && !shippingAddress && (
                <div className="CheckoutAccountAddressBook__ListItem__span">
                  <span>{labelNoDefaultAddressesAvailable}</span>
                </div>
              )}
            </div>
          </Collapsible>
          {/* Profile Addresses */}
          <Collapsible expanded={false} title={getCollapsibleTitle(textProfileAddresses)}>
            <AddressListView
              {...props}
              addressIds={getSortedAddressIds(profileAddressIds)}
              labelNoAddresses={labelNoProfileAddressesAvailable}
              itemType="ProfileAddress"
              showShippingBadge={false}
              showBillingBadge={false}
              selectThisAddress={selectThisAddress}
            ></AddressListView>
            <LoadMore
              paginationType={LOAD_MORE}
              numberOfItemsToLoad={limit}
              resetPage={resetPage}
              handleLoadMore={loadProfileAddresses}
              loadMoreLabel={textLoadMoreProfileAddress}
              loadMoreLoadingLabel={textLoading}
            ></LoadMore>
          </Collapsible>
          {/* Account Addresses */}
          <Collapsible expanded={false} title={getCollapsibleTitle(textAddressesForThisAccount)}>
            <AddressListView
              {...props}
              addressIds={getSortedAddressIds(accountAddressIds)}
              labelNoAddresses={labelNoAccountAddressesAvailable}
              itemType="AccountAddress"
              shippingAddress={shippingAddress}
              billingAddress={billingAddress}
              showShippingBadge={true}
              showBillingBadge={true}
              selectThisAddress={selectThisAddress}
            ></AddressListView>
            <LoadMore
              paginationType={LOAD_MORE}
              numberOfItemsToLoad={limit}
              resetPage={resetPage}
              handleLoadMore={loadAccountAddresses}
              loadMoreLabel={textLoadMoreAccountAddress}
              loadMoreLoadingLabel={textLoading}
            ></LoadMore>
          </Collapsible>
          {/* Inherited Addresses */}
          <Collapsible expanded={false} title={getCollapsibleTitle(textInheritedAddresses)}>
            <AddressListView
              {...props}
              addressIds={getSortedAddressIds(inheritedAddressIds)}
              labelNoAddresses={labelNoInheritedAddressesAvailable}
              itemType="InheritedAddress"
              showShippingBadge={false}
              showBillingBadge={false}
              selectThisAddress={selectThisAddress}
            ></AddressListView>
            <LoadMore
              paginationType={LOAD_MORE}
              numberOfItemsToLoad={limit}
              resetPage={resetPage}
              handleLoadMore={loadInheritedAddresses}
              loadMoreLabel={textLoadMoreInheritedAddress}
              loadMoreLoadingLabel={textLoading}
            ></LoadMore>
          </Collapsible>
        </div>
      </div>
    </Styled>
  );
};

CheckoutAccountAddressBook.propTypes = {
  /** Number of address to be returned in each list address call */
  numberOfAddressesToLoad: PropTypes.number,

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
      phoneNumber: PropTypes.string
    })
  ),

  /** Users current organization object from redux state(ProfileRepository->organizations)*/
  currentOrganization: PropTypes.shape({
    active: PropTypes.bool,
    repositoryId: PropTypes.string.isRequired
  }).isRequired,

  /** Callback function to handle selection of address */
  handleSelectAddress: PropTypes.func.isRequired
};

CheckoutAccountAddressBook.defaultProps = {
  contactInfos: {},
  numberOfAddressesToLoad: 12
};

export default connect(getComponentData)(CheckoutAccountAddressBook);
