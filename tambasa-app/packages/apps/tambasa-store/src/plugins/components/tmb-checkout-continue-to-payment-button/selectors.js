import {
  getCurrentProfileId,
  getCurrentOrder,
  isAuthenticated,
  getCurrentOrderId
} from '@oracle-cx-commerce/commerce-utils/selector';
import {useSelector} from '@oracle-cx-commerce/react-components/provider';

export const useComponentData = () => {
  const currentProfileId = useSelector(getCurrentProfileId);
  const isUserLoggedIn = useSelector(isAuthenticated) && currentProfileId !== 'anonymous';
  const {shippingGroups = {}} = useSelector(getCurrentOrder);
  const currentOrderId = useSelector(getCurrentOrderId);

  return {
    isUserLoggedIn,
    shippingGroups,
    currentOrderId
  };
};
