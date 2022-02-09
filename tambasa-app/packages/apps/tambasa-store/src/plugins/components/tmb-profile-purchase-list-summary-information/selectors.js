import {useEffect, useContext} from 'react';
import {StoreContext, ContainerContext} from '@oracle-cx-commerce/react-ui/contexts';
import {getProfile, getShareSettings} from '@oracle-cx-commerce/commerce-utils/selector';
import {useSelector} from '@oracle-cx-commerce/react-components/provider';
import {isEmptyObject} from '@oracle-cx-commerce/utils/generic';

export const useComponentData = () => {
  const profile = useSelector(getProfile);
  const shareSetting = useSelector(getShareSettings);
  const shareSettingId = !isEmptyObject(shareSetting) ? shareSetting[Object.keys(shareSetting)[0]].id : '';
  const orgId = profile.parentOrganization;

  const {action} = useContext(StoreContext);
  const {id: purchaseListId, owner} = useContext(ContainerContext);
  let sharedWith = {
    organizationSharingEnabled: false,
    emailSharingEnabled: false
  };
  if (shareSettingId !== '') {
    const {organizationSharingEnabled, sharedEmailConfigs} = shareSetting[shareSettingId] || {};
    const emailSharingEnabled = sharedEmailConfigs && sharedEmailConfigs.length > 0 ? true : false;
    sharedWith = {organizationSharingEnabled, emailSharingEnabled};
  }

  let isListOwner = false;
  if (owner && profile.id && owner.id === profile.id) {
    isListOwner = true;
  }

  useEffect(() => {
    if (purchaseListId) {
      let q;
      if (orgId) {
        q = `relativeTo eq "${purchaseListId}" AND account.Id eq "${orgId}"`;
      } else {
        q = `relativeTo eq "${purchaseListId}"`;
      }
      action('listShareSettings', {q});
    }
  }, [action, orgId, purchaseListId]);

  return {
    sharedWith,
    isListOwner
  };
};
