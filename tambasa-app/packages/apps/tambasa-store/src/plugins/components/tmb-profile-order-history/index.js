/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */
import { StoreContext } from '@oracle-cx-commerce/react-ui/contexts';
import { connect } from '@oracle-cx-commerce/react-components/provider';
import Styled from '@oracle-cx-commerce/react-components/styled';
import React from 'react';
import { t } from '@oracle-cx-commerce/utils/generic';
import ProfileOrder from './components/profile-order';
import Pagination from '@oracle-cx-commerce/react-components/pagination/standard';
import { buildQuerySQLPram, getOrder } from './utils';
import { getProfileOrdersData } from './selectors';
import css from './styles.css';


const { useCallback, useContext, useEffect, useRef, useState } = React;

/**
 * A component for listing profile related order.
 * New orders are loaded on click of Show More orders
 */
const TmbProfileOrderHistory = props => {
  const [orderIds, setOrderIds] = useState([]);
  const [maxNumberOfOrders, setMaxNumberOfOrders] = useState(0);
  const [currentOffset, setCurrentOffset] = useState(0);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const { action } = useContext(StoreContext);
  const [showWidget, setShowWidget] = useState(false);
  const { profileId, siteId, displayThumbnails, numberOfOrderToLoad, isUserLoggedIn, showPagination = false, menuList, setMenuList, widgetId } = props;

  const count = useRef(0);
  const q = useRef('');

  const menuConfig = {
    widgetId,
    name: "MEUS PEDIDOS"
  }

  const getOrderCallBack = useCallback(
    (recentOrderIds, response) => {
      setShowWidget(true);
      setLoadingOrders(false);
      if (recentOrderIds && recentOrderIds.length > 0) setOrderIds([...orderIds, ...recentOrderIds]);
      if (response && response.json) setMaxNumberOfOrders(response.json.totalResults);
    },
    [orderIds]
  );

  const onPageChange = useCallback(
    newOffset => {
      q.current = buildQuerySQLPram(profileId, siteId);
      getOrder(q.current, newOffset, parseInt(numberOfOrderToLoad, 10), action, displayThumbnails, recentOrderIds => {
        setCurrentOffset(newOffset);
        if (recentOrderIds && recentOrderIds.length > 0) setOrderIds(recentOrderIds);
        scrollTo({ top: 0, left: 0 });
      });
    },
    [action, displayThumbnails, numberOfOrderToLoad, profileId, siteId]
  );

  useEffect(() => {
    if (profileId && count.current === 0 && numberOfOrderToLoad) {
      count.current++;
      q.current = buildQuerySQLPram(profileId);
      getOrder(q.current, 0, parseInt(numberOfOrderToLoad, 10), action, displayThumbnails, getOrderCallBack);
    }
  }, [action, getOrderCallBack, profileId, displayThumbnails, numberOfOrderToLoad, siteId]);

  useEffect(() => {
    if (menuList && menuList.length > 0) {

      var menuListTemp = menuList.find(el => el.widgetId === widgetId);

      if (menuListTemp && !menuListTemp.name) {

        menuListTemp.name = "MEUS PEDIDOS";

        setMenuList(menuList);
      }
    }
  }, [menuList]);

  return (
    <Styled id="TmbProfileOrderHistory" css={css}>
      <section className="widget_order_history">
        <div className="order-history">
          <div className="order-history__table">
            <div className="order-history__table--head">
              <h4 className="order-history__title">{props.headingOrderHistory}</h4>
            </div>
            {isUserLoggedIn && showWidget && (
              <>
                {(orderIds.length > 0 &&
                  (
                    <div className="order-history__header">
                      <div className="order-history__data order-history__header--data">
                        <span className="order-history__text">Data</span>
                      </div>
                      <div className="order-history__data order-history__header--order-number">
                        <span className="order-history__text">Código</span>
                      </div>
                      <div className="order-history__data order-history__header--status">
                        <span className="order-history__text">Status</span>
                      </div>
                      <div className="order-history__data order-history__header--total">
                        <span className="order-history__text">Valor</span>
                      </div>
                      <div className="order-history__data">
                        <span className="order-history__text">Rastreio</span>
                      </div>
                      <div className="order-history__data">
                        <span className="order-history__text">Detalhes</span>
                      </div>
                    </div>
                  ))}
                <div className="order-history__list">
                  {(orderIds.length > 0 &&
                    orderIds.map(orderId => (
                      <ProfileOrder orderId={orderId} {...props}></ProfileOrder>
                    ))) || <div>{props.messageNoOrderAssociated}</div>}
                </div>
                {orderIds.length > 0 && maxNumberOfOrders > orderIds.length && !showPagination && (
                  <div className="ProfileOrderHistory__LoadMoreWrapper">
                    <button
                      type="button"
                      onClick={() => {
                        getOrder(
                          q.current,
                          orderIds.length - 1,
                          parseInt(props.numberOfOrderToLoad, 10),
                          action,
                          props.displayThumbnails,
                          getOrderCallBack
                        );
                        setLoadingOrders(true);
                      }}
                      className="secondary ProfileOrderHistory__LoadMore"
                      disabled={loadingOrders}
                    >
                      {loadingOrders
                        ? props.textRetrievingOrders
                        : t(props.actionShowMoreOrders, { ORDERSCOUNT: props.numberOfOrderToLoad })}
                    </button>
                  </div>
                )}
                {orderIds.length > 0 && showPagination && (
                  <div className="ProfileOrderHistory__PaginationWrapper">
                    <Pagination
                      currentOffset={currentOffset}
                      limit={numberOfOrderToLoad}
                      totalRecords={maxNumberOfOrders}
                      onPageChange={onPageChange}
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </section>
    </Styled>
  );
};

export default connect(getProfileOrdersData)(TmbProfileOrderHistory);
