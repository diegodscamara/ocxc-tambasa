import { PAGE_ORDER_DETAILS_LINK } from '@oracle-cx-commerce/commerce-utils/constants';
import React from 'react';
import { getOrder } from '@oracle-cx-commerce/commerce-utils/selector';
import { isEmptyObject } from '@oracle-cx-commerce/utils/generic';
import { useNavigator } from '@oracle-cx-commerce/react-components/link';
import { useSelector } from '@oracle-cx-commerce/react-components/provider';
import { useDateFormatter, useNumberFormatter } from '@oracle-cx-commerce/react-components/utils/hooks';
import { ORDER_STATE_MESSAGES } from '@oracle-cx-commerce/react-widgets/profile/profile-order-history/utils';

import {
  INPROGRESS_COLOR,
  FULFILLED_COLOR,
  FAILED_COLOR
} from '../utils';

const ProfileOrder = props => {
  const { orderId } = props;
  const order = useSelector(getOrder, { id: orderId }) || {};
  const goToPage = useNavigator();
  const formatCurrency = useNumberFormatter({ style: 'currency' }, order.priceListGroup);
  const formatDate = useDateFormatter();


  const statesAvailable = {
    failed: {
      color: FAILED_COLOR,
      tickPosition: 4
    },
    inProgress: {
      color: INPROGRESS_COLOR,
      tickPosition: 1
    },
    QueuedOrQuoted: {
      color: FULFILLED_COLOR,
      tickPosition: 1
    },
    approvedOrProcessing: {
      color: FULFILLED_COLOR,
      tickPosition: 2
    },
    submitted: {
      color: FULFILLED_COLOR,
      tickPosition: 3
    },
    fulfilled: {
      color: FULFILLED_COLOR,
      tickPosition: 4
    }
  };
  const statesMap = {
    AGENT_REJECTED: statesAvailable.failed,
    REJECTED_QUOTE: statesAvailable.failed,
    REJECTED: statesAvailable.failed,
    QUOTE_REQUEST_FAILED: statesAvailable.failed,
    FAILED_APPROVAL: statesAvailable.failed,
    FAILED: statesAvailable.failed,
    REMOVED: statesAvailable.failed,

    BEING_AMENDED: statesAvailable.inProgress,
    PENDING_REMOVE: statesAvailable.inProgress,
    PENDING_CUSTOMER_ACTION: statesAvailable.inProgress,
    PENDING_APPROVAL: statesAvailable.inProgress,
    PENDING_AGENT_APPROVAL: statesAvailable.inProgress,
    INCOMPLETE: statesAvailable.inProgress,
    SUSPENDED: statesAvailable.inProgress,
    PENDING_QUOTE: statesAvailable.inProgress,
    PENDING_MERCHANT_ACTION: statesAvailable.inProgress,
    PENDING_PAYMENT: statesAvailable.inProgress,

    QUEUED: statesAvailable.QueuedOrQuoted,
    QUOTED: statesAvailable.QueuedOrQuoted,

    APPROVED_TEMPLATE: statesAvailable.approvedOrProcessing,
    APPROVED: statesAvailable.approvedOrProcessing,
    PROCESSING: statesAvailable.approvedOrProcessing,

    SUBMITTED: statesAvailable.submitted,

    NO_PENDING_ACTION: statesAvailable.fulfilled,
    PENDING_CUSTOMER_RETURN: statesAvailable.fulfilled
  };

  const getStatusObject = state => {
    return state ? statesMap[state] : {};
  };

  const getStyle = state => {
    const stateRelatedData = getStatusObject(state);
    let styleObject = {};
    if (stateRelatedData) {
      const backgroundColor = getStatusObject(state).color;
      styleObject = {
        'color': backgroundColor.color,
      };
    } else {
      styleObject = { 'color': '#000' };
    }

    return styleObject;
  };

  return (
    <>
      {!isEmptyObject(order) && (

        <div className="order-history__item" tabIndex="0" onKeyPress={event => (event.key === 'Enter' ? goToPage(`${PAGE_ORDER_DETAILS_LINK}/${orderId}`) : '')}>
          <div className="order-history__content order-history__content--date">
            <label className="order-history__label">Data: </label>
            <span className="order-history__text-2 order-history__text-2--black-5">
              {
                (order.submittedDate && formatDate(new Date(order.submittedDate))) ||
                (order.creationDate && formatDate(new Date(order.creationDate)))
              }
            </span>
          </div>
          <div className="order-history__content order-history__content--order-number">
            <label className="order-history__label">Código: </label>
            <span className="order-history__text-2 order-history__text-2--black-5">{order.id}</span>
          </div>
          <div className="order-history__content order-history__content--status">
            <label className="order-history__label">Status: </label>
            <span
              className="order-history__text-2 order-history__text-2--black-5" style={getStyle(order.state)}>{order.state && props[ORDER_STATE_MESSAGES[order.state]]}</span>
          </div>
          <div className="order-history__content order-history__content--total">
            <label className="order-history__label">Valor: </label>
            <span className="order-history__text-2 ">{order.total && formatCurrency(order.total)}</span>
          </div>
          <div className="order-history__content order-history__item-bottom">
            <div className="order-history__content order-history__content--link-order">
              <a className="order-history__text-2"> </a>
            </div>
          </div>
          <div className="order-history__content order-history__item-bottom">
            <div className="order-history__content order-history__content--details">
              <span className="btn" onClick={() => goToPage(`${PAGE_ORDER_DETAILS_LINK}/${orderId}`)}>DETALHES</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileOrder;
