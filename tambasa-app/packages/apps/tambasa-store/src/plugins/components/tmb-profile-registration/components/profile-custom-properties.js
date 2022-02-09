/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

// import React, {useContext} from 'react';
// import DynamicProperty from '@oracle-cx-commerce/react-components/dynamic-property';
// import {fetchShopperCustomProperties} from '@oracle-cx-commerce/fetchers/custom-properties';
// import {connect} from '@oracle-cx-commerce/react-components/provider';
// import {useShopperCustomPropertiesFetcher} from '@oracle-cx-commerce/fetchers/custom-properties/hooks';
// import {StoreContext} from '@oracle-cx-commerce/react-ui/contexts';
// import {getCustomPropertiesData} from '@oracle-cx-commerce/react-widgets/profile/profile-registration/selectors';

// /**
//  * export fetchers to load common resources & shopper settings (password policies)
//  * and shopper custom properties into the state during server-side rendering.
//  */
// export const fetchers = [fetchShopperCustomProperties];

// /**
//  * Pseudo logic that renders profile custom properties meta data for capturing the information
//  * @param props
//  */

// eslint-disable-next-line no-unused-vars
export const ProfileCustomProperties = ({customPropertiesUser, labelYes, labelNo}) => {
  //   const store = useContext(StoreContext);
  //   /**
  //    * invoke fetcher hook to load common resources, shopper custom properties & shopper custom properties
  //    * into state during client side rendering
  //    * this will not perform any task if state already has shopper custom properties
  //    * This is effective if SSR didn't populate the state with shopper custom properties data
  //    */
  //   useShopperCustomPropertiesFetcher(store);

  //Replace this return with 38 line return
  return null;

  //   return (
  //     <>
  //       {customPropertiesUser && customPropertiesUser.length > 0 && (
  //         <div>
  //           {customPropertiesUser.map(customProperty => (
  //             <DynamicProperty key={customProperty.id} {...customProperty} falseLabel={labelNo} trueLabel={labelYes} />
  //           ))}
  //         </div>
  //       )}
  //     </>
  //   );
};

// connect(getCustomPropertiesData)(ProfileCustomProperties);
