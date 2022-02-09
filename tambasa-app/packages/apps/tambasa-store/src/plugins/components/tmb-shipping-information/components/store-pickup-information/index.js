import React from 'react';
import Styled from '@oracle-cx-commerce/react-components/styled';
import css from './styles.css';

export const StorePickUpInformation = props => {
  const {storeAddress = {}, headingStorePickUpAt} = props;
  const {name, address1, address2, city, stateAddress, postalCode, country, phoneNumber} = storeAddress;

  return (
    <Styled id="StorePickUpInformation" css={css}>
      <div className="StorePickUpInformation__StoreAddress">
        <div className="StorePickUpInformation__PickUpAtLabel">{headingStorePickUpAt}</div>
        {name && (
          <div className="StorePickUpInformation__PickUpAtDetails">
            <div className="StorePickUpInformation__PickUpAtAddress">
              <span>{name}</span>
            </div>
            {address1 && (
              <div className="StorePickUpInformation__PickUpAtAddress">
                <span>{`${address1},`}</span>
              </div>
            )}
            {address2 && (
              <div className="StorePickUpInformation__PickUpAtAddress">
                <span>{`${address2},`}</span>
              </div>
            )}
            <div className="StorePickUpInformation__PickUpAtAddress">
              <span>{city}</span>
              <span>{stateAddress}</span>
              <span>{postalCode}</span>
              <span>{country}</span>
            </div>
            {phoneNumber && (
              <div className="StorePickUpInformation__PickUpAtAddress">
                <span>{phoneNumber}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </Styled>
  );
};
