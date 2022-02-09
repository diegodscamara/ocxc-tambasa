import React, { useContext } from 'react';
import Styled from '@oracle-cx-commerce/react-components/styled';
import Link from '@oracle-cx-commerce/react-components/link';
import { AiOutlineMail, AiOutlineFacebook, AiOutlineInstagram, AiOutlineLinkedin } from 'react-icons/ai';
import { FaPhoneAlt } from 'react-icons/fa';
import { VscGear } from 'react-icons/vsc';
import { IoIosArrowDown } from 'react-icons/io';
import { BiUserCircle } from 'react-icons/bi';
import { shopperSelector } from '../../selectors'
import { connect } from '@oracle-cx-commerce/react-components/provider';
import { t } from '@oracle-cx-commerce/utils/generic';
import { StoreContext } from '@oracle-cx-commerce/react-ui/contexts'
import { BiLogOut } from 'react-icons/bi'
import css from './styles.css';

const tmbHeaderContact = props => {
  const {
    contactEmailLink = '#',
    contactEmailText = 'atendimento@tambasa.com.br',
    contactPhoneLink = '#',
    contactPhoneText = '(31) 3359-0291 | (31) 3359-0291',
    facebooklLink = '#',
    instagramLink = '#',
    linkedinLink = '#',
    menuHomeLink = '#',
    menuHomeText = 'HOME',
    menuPromoLink = '#',
    menuPromoText = 'PROMOÇÕES',
    menuBlogLink = '#',
    menuBlogText = 'BLOG',
    menuContactLink = '#',
    menuContactText = 'FALE CONOSCO',
    servicesLink = '#',
    servicesText = 'Outros serviços',
    profile,
    isLoggedMessage,
    isUserLoggedIn,
    isNotLoggedMessage,
    actionLogOutText,
    pagesMenuText
  } = props;

  const { action } = useContext(StoreContext)

  const Mailto = ({ email, subject, body, children}) => {
    return (
      <a className="tmbHeaderContact__Link" href={`mailto:${email}?subject=${encodeURIComponent(subject) || ''}&body=${encodeURIComponent(body) || ''}`}>{children}</a>
      );
  };

  const Phone = ({children}) => {
    return (
      <a className="tmbHeaderContact__Link" href={`tel:${contactPhoneLink || ''}`}>{children}</a>
    );
  };

  return (
    <Styled id="tmbHeaderContact" css={css}>
      {/* Header Contact Starts here */}
      <div className="tmbHeaderContact">
        <div className="tmbHeaderContact__Email">
          <Mailto email={contactEmailLink || ''} subject="" body="">
            <AiOutlineMail className="tmbHeaderContact__Icon" />
            {contactEmailText}
          </Mailto>
        </div>
        <div className="tmbHeaderContact__Phone">
          <Phone>
            <FaPhoneAlt className="tmbHeaderContact__Icon" />
            {contactPhoneText}
          </Phone>
        </div>
        <div className="tmbHeaderContact__Social">
          <Link className="tmbHeaderContact__Link" route={facebooklLink}>
            <AiOutlineFacebook className="tmbHeaderContact__Icon" />
          </Link>
          <Link className="tmbHeaderContact__Link" route={instagramLink}>
            <AiOutlineInstagram className="tmbHeaderContact__Icon" />
          </Link>
          <Link className="tmbHeaderContact__Link" route={linkedinLink}>
            <AiOutlineLinkedin className="tmbHeaderContact__Icon" />
          </Link>
        </div>
        <div className="tmbHeaderContact__Menu">
          <div className="tmbHeaderContact__MenuDropdownMob">
            {pagesMenuText}
            <IoIosArrowDown className="tmbHeaderContact__Icon" />
          </div>
          <div className="tmbHeaderContact__LinkContainer_Mob">
          <Link className="tmbHeaderContact__Link" route={menuHomeLink}>
            {menuHomeText}
          </Link>
          <Link className="tmbHeaderContact__Link" route={menuPromoLink}>
            {menuPromoText}
          </Link>
          <Link className="tmbHeaderContact__Link" route={menuBlogLink}>
            {menuBlogText}
          </Link>
          <Link className="tmbHeaderContact__Link" route={menuContactLink}>
            {menuContactText}
          </Link>
        </div>
          <div className="tmbHeaderContact__LinkContainer">
            <Link className="tmbHeaderContact__Link" route={menuHomeLink}>
              {menuHomeText}
            </Link>
            <Link className="tmbHeaderContact__Link" route={menuPromoLink}>
              {menuPromoText}
            </Link>
            <Link className="tmbHeaderContact__Link" route={menuBlogLink}>
              {menuBlogText}
            </Link>
            <Link className="tmbHeaderContact__Link" route={menuContactLink}>
              {menuContactText}
            </Link>
          </div>
        </div>
        <div className="tmbHeaderContact__Services">
          <Link className="tmbHeaderContact__Link" route={servicesLink}>
            <VscGear className="tmbHeaderContact__Icon" />
            <span className='tmbHeaderContact__ServicesTextLink'>
            {servicesText}
            </span>
            <IoIosArrowDown className="tmbHeaderContact__Icon" />
          </Link>
        </div>
        <div className="tmbHeaderContact__User tmbHeaderContact__Welcome">
          <BiUserCircle className="tmbHeaderContact__Icon" />
          {isUserLoggedIn ? t(isLoggedMessage, { firstName: profile.firstName || '' }) : t(isNotLoggedMessage)}
        </div>
        {isUserLoggedIn
          ? <div className="tmbHeaderContact__Logout">
            <a className="ButtonLogout"
              href="javascript:void(0)"
              onClick={() => (action('logout'))}
              title={t(actionLogOutText)}>
              <BiLogOut className="ButtonLogout__Icon" />
            </a>
          </div>
          : <></>
        }
      </div>
      {/* Header Contact Ends here */}
    </Styled>
  );
};

export default connect(shopperSelector)(tmbHeaderContact);
