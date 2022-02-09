/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import React, { useCallback, useMemo, useRef, useState, useEffect } from 'react';

import AddressBookCard from './components/address-book-card';
import { PAGE_ADD_PROFILE_ADDRESS_LINK } from '@oracle-cx-commerce/commerce-utils/constants';
import Styled from '@oracle-cx-commerce/react-components/styled';
import { connect } from '@oracle-cx-commerce/react-components/provider';
import css from './styles.css';
import { getComponentData } from './selectors';
import { useNavigator } from '@oracle-cx-commerce/react-components/link';

import ProfileAddressForm from "../tmb-profile-address-form";

const ProfileAddressBook = props => {
  const { actionAddNewAddress, headingAddressBook, labelNoProfileAddressesAvailable, menuList, setMenuList, widgetId, activeTab } = props;

  const { isUserLoggedIn, contactInfos, isGetProfileAddressInProgress, defaultShippingAddressId, shippingAddressIds, profile } = props;

  const [currentPage, setCurrentPage] = useState("main");
  const [editingAddresId, setEditingAddresId] = useState(null);

  // A flag to keep address action popover toggling
  const [showAddressActions, setShowAddressActions] = useState(new Map());
  const goToPage = useNavigator();

  const isB2BUser = profile.dynamicProperties ? profile.dynamicProperties.find((prop) => prop.id === "tam_isB2B_user").value : false;


  const hideAllPopover = useCallback(
    addressId => {
      showAddressActions.forEach(function (value, key) {
        if (key !== addressId && value === true) {
          setShowAddressActions(new Map(showAddressActions.set(key, !showAddressActions.get(key))));
        }
      });
    },
    [showAddressActions]
  );

  const handlePopoverToggle = useRef(addressId => {
    hideAllPopover(addressId);
    setShowAddressActions(new Map(showAddressActions.set(addressId, !showAddressActions.get(addressId))));
  });

  /* returns options array sorted by lastName */
  const sortedShippingAddressIds = useMemo(() => {
    const sortedShippingAddressIds = [];

    if (defaultShippingAddressId) {
      sortedShippingAddressIds[0] = defaultShippingAddressId;
    }
    const addressIdsWithoutDefaultAddress = shippingAddressIds.filter(
      addressId => addressId !== defaultShippingAddressId
    );
    const sortedAddressIds = addressIdsWithoutDefaultAddress.sort((a, b) => {
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

    return sortedShippingAddressIds.concat(sortedAddressIds);
  }, [contactInfos, defaultShippingAddressId, shippingAddressIds]);

  useEffect(() => {
    if (menuList && menuList.length > 0) {

      var menuListTemp = menuList.find(el => el.widgetId === widgetId);

      if (menuListTemp && !menuListTemp.name) {

        menuListTemp.name = "MEUS ENDEREÇOS";

        setMenuList(menuList);
      }
    }
  }, [menuList]);

  useEffect(() => {
    setCurrentPage("main");
  }, [activeTab]);


  return (
    <Styled id="ProfileAddressBook" css={css}>
      {isUserLoggedIn && currentPage === "main" && (
        <div className="ProfileAddressBook">
          <h1>{headingAddressBook}</h1>
          <div className="ProfileAddressBook__AddressesList">
            {isGetProfileAddressInProgress === 0 && (
              <>
                {contactInfos && shippingAddressIds && shippingAddressIds.length > 0 ? (
                  <div className="addresses-container">
                    {sortedShippingAddressIds.map(itemId => (
                      <React.Fragment key={`${itemId}`}>
                        <AddressBookCard
                          {...props}
                          handlePopoverToggle={handlePopoverToggle.current}
                          showMenuPopover={showAddressActions.get(itemId)}
                          itemId={itemId}
                          isB2BUser={isB2BUser}
                          setCurrentPage={setCurrentPage}
                          setEditingAddresId={setEditingAddresId}
                        />
                      </React.Fragment>
                    ))}
                  </div>
                ) : (
                  <div className="ProfileAddressBook__NoAddressLabel">
                    <span>{labelNoProfileAddressesAvailable}</span>
                  </div>
                )}
              </>
            )}
          </div>
          {!isB2BUser ? (
            <div className="ProfileAddressBook__AddNewAddressLink">
              <button
                id="add-profile-address-button"
                type="button"
                onClick={() => setCurrentPage("adding")}
                className="ProfileAddressBook__AddNewAddress"
                aria-label={actionAddNewAddress}
              >
                {actionAddNewAddress}
              </button>
            </div>
          ) : " "}
        </div>
      )}

      {currentPage === "adding" && (<ProfileAddressForm {...props} setCurrentPage={setCurrentPage}/>)}
      {currentPage === "editing" && (<ProfileAddressForm {...props} editingAddresId={editingAddresId} setCurrentPage={setCurrentPage}/>)}
    </Styled>
  );
};

export default connect(getComponentData)(ProfileAddressBook);
