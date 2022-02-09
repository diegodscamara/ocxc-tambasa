/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import { Tab, TabContainer } from '@oracle-cx-commerce/react-components/tabs';

import Link from '@oracle-cx-commerce/react-components/link';
import MyPurchaseLists from './components/my-purchase-lists';
import { PAGE_CREATE_PURCHASE_LIST_LINK } from '@oracle-cx-commerce/commerce-utils/constants';
import Plus from '@oracle-cx-commerce/react-components/icons/plus';
import React, { useEffect } from 'react';
import SharedPurchaseLists from './components/shared-purchase-lists';
import Styled from '@oracle-cx-commerce/react-components/styled';
import css from './styles.css';

/**
 * A widget that show two lists of purchase lists of users - their own purchase lists
 * and the purchase lists shared to them (individually or through their organization)
 */
const ProfilePurchaseLists = props => {
  const { headingMyLists, headingSharedLists, menuList, setMenuList, widgetId, activeTab } = props;

  useEffect(() => {
    if (menuList && menuList.length > 0) {

      var menuListTemp = menuList.find(el => el.widgetId === widgetId);

      if (menuListTemp && !menuListTemp.name) {

        menuListTemp.name = "LISTAS DE COMPRA";

        setMenuList(menuList);
        props.setPurchaselistId(widgetId);
      }
    }
  }, [menuList]);

  

  return (
    <Styled id="TmbProfilePurchaseLists" css={css}>
      <div className="ProfilePurchaseLists">
        <h1>{props.headingPurchaseLists}</h1>
        <button onClick={() => props.setActiveTab(props.createPurchaseListId)} className="ProfilePurchaseLists__NewPurchaselistButton">
          <Plus className="AddList__Icon"></Plus>
          <span>{props.labelNewList}</span>
        </button>
        <TabContainer label={props.headingPurchaseLists}>
          <Tab header={headingMyLists}>
            <MyPurchaseLists {...props}></MyPurchaseLists>
          </Tab>
          <Tab header={headingSharedLists}>
            <SharedPurchaseLists {...props}></SharedPurchaseLists>
          </Tab>
        </TabContainer>
      </div>
    </Styled>
  );
};

ProfilePurchaseLists.propTypes = {};

ProfilePurchaseLists.defaultProps = {};

export default ProfilePurchaseLists;
