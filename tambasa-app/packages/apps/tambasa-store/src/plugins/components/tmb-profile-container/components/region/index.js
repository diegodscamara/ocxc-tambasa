/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import React, { useState, useEffect, useContext } from 'react';
import Stack from '@oracle-cx-commerce/react-components/stack';
import Widget from '@oracle-cx-commerce/react-components/widget';
import { connect } from '@oracle-cx-commerce/react-components/provider';
import { getRegion, getWidget } from '@oracle-cx-commerce/commerce-utils/selector';
import PropTypes from 'prop-types';
import {searchStringToQueryParams} from '@oracle-cx-commerce/utils/generic'

import { PAGE_HOME_LINK } from '@oracle-cx-commerce/commerce-utils/constants';
import { StoreContext } from '@oracle-cx-commerce/react-ui/contexts';
import { useNavigator } from '@oracle-cx-commerce/react-components/link';
import { AiOutlineRight } from 'react-icons/ai';
/**
 * Displays the region component
 */

const Region = props => {
  const { regions = [], widgets = [], width = 12, structure, id, cssClass, menuLogoutLabel } = props;
  const additionalCss = cssClass ? ` ${cssClass}` : '';

  const { action, getState } = useContext(StoreContext);
  const goToHome = useNavigator(PAGE_HOME_LINK);

  /* Logs out the user and closes the menu.
    If the logout is done on authenticated pages, it will be navigated to home*/
  const logout = () => {
    action('logout').then(response => {
      if (response.ok === true ) {
        goToHome();
      }
    });
  };

  const [menuList, setMenuList] = useState([]);
  const [activeTab, setActiveTab] = useState("");
  const [createPurchaseListId, setCreatePurchaseListId] = useState("");
  const [purchaselistId, setPurchaselistId] = useState("");

  /**
   * @author guilherme.vieira
   * @description finds a item inside the menu list array
   * @returns {String | undefined} a widget id or nothing
   */
  const findWidgetIdForMenuItem = (targetMenuTab) => {
    const purchaseListMenuId = menuList.find(
      menuItem => 
        menuItem.name === targetMenuTab.name ||
        menuItem.id.includes(targetMenuTab.id) ||
        menuItem.componentId === targetMenuTab.componentId ||
        menuItem.widgetId === targetMenuTab.widgetId
    )

    return purchaseListMenuId && purchaseListMenuId.widgetId
  }

  /**
   * @author guilherme.vieira
   * @description if a query param is provided we'd to use it to navigate on the
   * side bar menu. Otherwise, if no query param or no active tab, it will use the first
   * menu item inside the array
   */
  const paramsNavigation = () => {
    const params = searchStringToQueryParams(window.location.search)
    const paramskeys = Object.keys(params)
    let widgetInfo
    if(paramskeys && paramskeys.length > 0 ) {
      const param = paramskeys[0]
      switch(param) {
        case "purchase-lists":
          widgetInfo = {
            id: "profile-purchase-lists",
            widgetId: "profile-purchase-lists",
            name: "LISTAS DE COMPRAS",
            componentId: "TmbProfilePurchaseLists"
          }
          setActiveTab(findWidgetIdForMenuItem(widgetInfo))
        default: 
          return
      }
    } else
      if (!activeTab) 
        setActiveTab(menuList[0].widgetId);
  }

  useEffect(() => {
    if(menuList && menuList.length > 0) {
      paramsNavigation()
    }
  }, [menuList])

  useEffect(() => {
    if (widgets.length > 0) {
      const widgetsInMenu = []
      widgets.forEach(widgetId => {
        const { id, componentId, widgetPresentationName } = getWidget(getState(), { widgetId })
        widgetsInMenu.push({ id, componentId, widgetId, widgetPresentationName })
      })
      setMenuList(widgetsInMenu)
    }
  }, []);

  return structure === 'stack' ? (
    <Stack key={id} stackId={id} />
  ) : (
    <section id="TmbProfileContainerRegion" className={`Region col-${width}${additionalCss}`}>
      <div className="custom-profile-container">
        <div className="custom-col-md-3 custom-lg-4 custom-col-sm-12">
          <section className="widget_account_menu">
            <div className="account-menu__table--head">
              <p className="account-menu__title">Minha conta</p>
            </div>
            <div className="account-menu">
              <div className="account-menu__list">
                {menuList && menuList.map(item => (
                  <div className={activeTab === item.widgetId ? "account-menu__item account-menu__item--active" : "account-menu__item "} onClick={() => setActiveTab(item.widgetId)} key={item.widgetId}>
                    <p className="account-menu__text">
                      { item.widgetPresentationName || item.name || item.widgetId }
                      {
                        activeTab === item.widgetId && 
                        (<AiOutlineRight size={"1.5em"}  className="account-menu__item--active-icon" />)
                      }
                    </p>
                  </div>
                ))}
                  <div className="account-menu__item account-menu__item--logout" onClick={logout}>
                  <p className="account-menu__text">{menuLogoutLabel}</p>
                </div>
              </div>
            </div>
          </section>
        </div>
        <div className="custom-col-md-9 custom-lg-8 custom-col-sm-12">
          {/* {regions.map((regionId, index) => (

            <Region key={index} regionId={regionId} /> // eslint-disable-line react/no-array-index-key
          ))} */}
          {widgets.map(widgetId => (
            <div key={widgetId} className={activeTab === widgetId ? "show" : "hide"}>
              <Widget widgetId={widgetId} menuList={menuList} setMenuList={setMenuList} activeTab={activeTab} setActiveTab={setActiveTab} purchaselistId={purchaselistId} createPurchaseListId={createPurchaseListId} setCreatePurchaseListId={setCreatePurchaseListId} setPurchaselistId={setPurchaselistId} />
            </div>
          ))}
        </div>

      </div>

    </section>
  );
};

Region.propTypes = {
  /**
   * Array of region IDs
   */
  regions: PropTypes.arrayOf(PropTypes.string),

  /**
   * Array of the widgets in the region
   */
  widgets: PropTypes.arrayOf(PropTypes.string),

  /**
   * Width (on screen) taken by the region
   */
  width: PropTypes.number,

  /**
   * ID of the element
   */
  id: PropTypes.string,

  /**
   * Class name for any additional css
   */
  cssClass: PropTypes.string
};

Region.defaultProps = {
  regions: [],
  widgets: [],
  width: 12,
  cssClass: undefined,
  id: undefined
};

Region.Connected = connect(getRegion)(Region);

export default Region.Connected;
