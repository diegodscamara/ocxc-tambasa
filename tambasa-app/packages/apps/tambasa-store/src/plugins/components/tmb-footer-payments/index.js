import React from 'react';
import Styled from '@oracle-cx-commerce/react-components/styled';
import {t} from '@oracle-cx-commerce/utils/generic';

import css from './styles.css';

const TmbFooterPayments = props => {

  const {
    paymentMethodsText,
    paymentMethodsImage
  } = props;

  return (
    <Styled id="TmbFooterPayments" css={css}>
      {/* Footer Payments Starts here */}
      <div className="TmbFooterPayments">
        <div className="TmbFooterPayments__Text">
        {t(paymentMethodsText)}
        </div>
        <div className="TmbFooterPayments__Img">
          <img src={paymentMethodsImage.src} alt="Formas de Pagamento" border="0" />
        </div>
      </div>
      {/* Footer Payments Ends here */}
    </Styled>
  );
};

export default TmbFooterPayments;
