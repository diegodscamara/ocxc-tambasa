import React, { useCallback, useContext, useEffect, useState } from 'react';
import { createCookie, removeCookie } from './utils';
import { getSite, getVisitorServiceConfiguration } from '@oracle-cx-commerce/commerce-utils/selector';

import Link from '@oracle-cx-commerce/react-components/link';
import { StoreContext } from '@oracle-cx-commerce/react-ui/contexts';
import Styled from '@oracle-cx-commerce/react-components/styled';
import WebContent from '@oracle-cx-commerce/react-widgets/common/web-content/component';
import css from './styles.css';
import { getCookie } from '@oracle-cx-commerce/utils/node';

/**
 * Widget to take GDPR cookie consent from the user.
 */
const TmbCookieControl = props => {
  const {
    headingGDPRCookieControlTitle,
    textCookieControlMessage1,
    textCookieControlMessage2,
    labelAcceptButton,
    labelOptOutButton,
    textAgreeToUseCookie,
    webContent,
    cookiePolicyURL,
    textCookiePolicyHyperText
  } = props;

  const necessaryCookies = 'access_token,xdVisitorId,xvVisitId,OCStateData';

  const { getState } = useContext(StoreContext);
  const { requireGDPRCookieConsent: requireCookieConsent, id: site } = getSite(getState());
  const [show, setShow] = useState(false);

  /**
   * This function will delete all the cookies except the necessaryCookies when consent is revoked
   */
  const onConsentRevoke = useCallback(() => {
    const allCookies = document.cookie;
    const { tenantId } = getVisitorServiceConfiguration(getState());
    const protectedCookieList = necessaryCookies.split(',').map(curElement => {
      if (curElement === 'xdVisitorId') return `xd${tenantId}_${site}`;
      if (curElement === 'xvVisitId') return `xv${tenantId}_${site}`;

      return curElement.trim();
    });
    const cookiesToDelete = allCookies
      .trim()
      .split(/; */)
      .filter(curCookie => {
        return !protectedCookieList.find(cookie => new RegExp(`^${cookie}=`).test(curCookie));
      });
    cookiesToDelete.forEach(cookie => {
      removeCookie(cookie);
    });
    setShow(false);
  }, [getState, site]);

  /**
   * This function will add GDPRCookieP13nConsentGranted cookie to browser when consent is accepted
   */
  const onConsentAccept = useCallback(() => {
    createCookie('GDPRCookieP13nConsentGranted', true);
    setShow(false);
  }, []);

  useEffect(() => {
    if (requireCookieConsent === false) {
      createCookie('GDPRCookieP13nConsentNotRequired', true);
      removeCookie(getCookie(document.cookie, 'GDPRCookieP13nConsentGranted'));
      setShow(false);
    } else {
      //remove required since, presence of GDPRCookieP13nConsentNotRequired indicates cookies are allowed on server
      removeCookie(getCookie(document.cookie, 'GDPRCookieP13nConsentNotRequired'));
      if (getCookie(document.cookie, 'GDPRCookieP13nConsentGranted') === undefined) {
        setShow(true);
      }
    }
  }, [requireCookieConsent]);

  useEffect(() => {
    console.log('rendered .....')
  }, [])

  return (
    <Styled id="TmbCookieControl" css={css}>
      {show && (
        <div className="TmbCookieControl">
          <div className="TmbCookieControl__Heading">{headingGDPRCookieControlTitle}</div>
          <div className="TmbCookieControl__Message">
            {`${textCookieControlMessage1} ${textCookieControlMessage2}`}
            <div>
              {cookiePolicyURL ? (
                <>
                  {textAgreeToUseCookie}
                  <Link className="TmbCookieControl__CookiePolicyLink" href={cookiePolicyURL}>
                    {textCookiePolicyHyperText}
                  </Link>
                </>
              ) : (
                `${textAgreeToUseCookie} ${textCookiePolicyHyperText}`
              )}
            </div>
            {!cookiePolicyURL && webContent && <WebContent webContent={webContent} />}
          </div>
          <div className="TmbCookieControl__Buttons">
            <button type="button" onClick={onConsentAccept} className="TmbCookieControl__AcceptButton">
              {labelAcceptButton}
            </button>
            <button type="button" onClick={onConsentRevoke} className="secondary TmbCookieControl__DeclineButton">
              {labelOptOutButton}
            </button>
          </div>
        </div>
      )}
    </Styled>
  );
};

export default TmbCookieControl;
