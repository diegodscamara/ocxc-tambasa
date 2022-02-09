import React, {useContext} from 'react';
import {HardGoodShippingGroupList} from './components/hardgood-shippinggroup-list';
import {OrderContext} from '@oracle-cx-commerce/react-ui/contexts';
import OrderSelectAll from './components/order-select-all';
import {PickUpInStoreShippingGroupList} from './components/pickupinstore-shippinggroup-list';
import {ShippingGroupList} from './components/shippinggroup-list';
import Styled from '@oracle-cx-commerce/react-components/styled';
import {connect} from '@oracle-cx-commerce/react-components/provider'
import {getComponentData} from './selectors'
import css from './styles.css';
import {isEmptyObject} from '@oracle-cx-commerce/utils/generic';

/**
* Following widget renders all the shipping groups present in the order.
* Sorts the shipping groups to display hard good shipping groups first and
* Pickup in store shipping groups at the last.
* @param props
*/
const TmbShippingInformation = props => {
  const {messageEmptyCart} = props;
  /*
    Placeholder to modify shipping groups sorting on client side
    after large cart endpoint supports sorting.
  */
  const isSortRequired = props.sortShippingGroups !== undefined ? props.sortShippingGroups : true;
  const {shippingGroups = {}, commerceItems = {}, priceListGroup} = useContext(OrderContext);

  return (
    <Styled id="TmbShippingInformation" css={css}>
      <div className="TmbShippingInformation">
        {isEmptyObject(commerceItems) ? (
          <div className="TmbShippingInformation__ErrorMessage">{messageEmptyCart}</div>
        ) : (
          <>
            {props.enableProductSelection && <OrderSelectAll commerceItems={commerceItems} {...props} />}
            {isSortRequired ? (
              <>
                <HardGoodShippingGroupList shippingGroups={shippingGroups} {...props} priceListGroup={priceListGroup} />
                <PickUpInStoreShippingGroupList
                  shippingGroups={shippingGroups}
                  {...props}
                  priceListGroup={priceListGroup}
                />
              </>
            ) : (
              //No Sorting. Default Shipping Groups list order
              <ShippingGroupList shippingGroups={shippingGroups} {...props} />
            )}
          </>
        )}
      </div>
    </Styled>
  );
};

export default connect(getComponentData)(TmbShippingInformation);
