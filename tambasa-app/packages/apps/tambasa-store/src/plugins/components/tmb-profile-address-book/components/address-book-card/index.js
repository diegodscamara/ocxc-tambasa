import React from 'react';

import AddressView from '../address-view';
import MoreAddressActions from '../more-address-actions';
import Styled from '@oracle-cx-commerce/react-components/styled';
import css from './styles.css';

/**
 * Component to display an account address card.
 * @param {Object} props the properties object
 */
const AddressBookCard = props => {
  const { itemId, defaultShippingAddressId, contactInfos, isB2BUser } = props;

  return (
    <Styled id="AddressBookCard" css={css}>
      {contactInfos && contactInfos[itemId] && (
        <div className="address-card-container" key={`${itemId}`} >
          <div className="card-header-container" >
            {!isB2BUser ? (
              <MoreAddressActions {...props} />
            ) : "."}
          </div>
          <div className="main-card-container">
            <div className="AddressBookCard__AddressView">
              <AddressView
                {...props}
                showShippingBadge={defaultShippingAddressId === itemId}
                address={contactInfos[itemId]}
                addressInfoClass={'AddressBookCard__Info'}
              />
            </div>
          </div>
        </div>
      )}
    </Styled>
  );
};

export default React.memo(AddressBookCard);
