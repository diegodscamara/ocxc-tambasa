import React from 'react';
import Styled from '@oracle-cx-commerce/react-components/styled';
import {t} from '@oracle-cx-commerce/utils/generic';

import { AiOutlineWhatsApp } from 'react-icons/ai'
import css from './styles.css';

const TmbHeaderWhatsappContact = props => {
  const {
    whatsAppAccountPhoneNumber,
    whatsAppAttendancePageLink,
    attendanceTitle
  } = props
  
  return (
      <Styled id="TmbHeaderWhatsappContact" css={css}>
        <div className="TmbHeaderWhatsappContact">
          <a href={whatsAppAttendancePageLink} target="_blank" rel={'external'}>
            <div className="WhatsAppContainer">
              <div className="WhatsAppContainer__IconBlock">
                <AiOutlineWhatsApp color="#fff"/>
              </div>
              <div className="WhatsAppContainer__InfoBlock">
                <span className="WhatsAppContainer__InfoBlock___Title">
                  { t(attendanceTitle) }
                </span>
                <span className="WhatsAppContainer__InfoBlock___PhoneNumber">
                  { whatsAppAccountPhoneNumber }
                </span>
              </div>
            </div>
          </a>
        </div>
      </Styled>
    );
};

export default TmbHeaderWhatsappContact;
