import {useContext} from 'react';
import {ContainerContext} from '@oracle-cx-commerce/react-ui/contexts';
import {getProfile} from '@oracle-cx-commerce/commerce-utils/selector';
import {useSelector} from '@oracle-cx-commerce/react-components/provider';

/**
 * Hook to compute and return orgId for sharing a Purchase List with account and
 * if the logged in user is the list owner
 */
export const useComponentData = () => {
  const {owner} = useContext(ContainerContext);
  const profile = useSelector(getProfile);
  const orgId = profile.parentOrganization;
  let isListOwner = false;
  if (owner && profile.id && owner.id === profile.id) {
    isListOwner = true;
  }

  return {
    orgId,
    isListOwner
  };
};
