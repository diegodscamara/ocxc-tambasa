import {getCurrentOrderShippingMethods, getShippingMethods} from '@oracle-cx-commerce/commerce-utils/selector';
import {useSelector} from '@oracle-cx-commerce/react-components/provider';

export const useComponentData = ({shippingGroupId}) => {
  const shippingMethodIds = useSelector(getCurrentOrderShippingMethods)[shippingGroupId] || [];
  const shippingMethodsState = useSelector(getShippingMethods);
  const shippingMethodsDetails = shippingMethodIds.reduce((shippingMethods, shippingMethodId) => {
    shippingMethods[shippingMethodId] = shippingMethodsState[shippingMethodId] || {};

    return shippingMethods;
  }, {});

  return {
    shippingMethodsDetails,
    shippingMethodIds
  };
};
