import React from 'react';
import Styled from '@oracle-cx-commerce/react-components/styled';
import css from './styles.css';

const DropDownMedia = ({categoryMedia = ''}) => {
  function getCategoryMedia() {
    return {__html: categoryMedia};
  }

  return (
    <Styled id="CollectionNavigationDesktop__DropDownMedia" css={css}>
      <div className="CollectionNavigationDesktop__DropDownMedia" dangerouslySetInnerHTML={getCategoryMedia()}></div>
    </Styled>
  );
};

export default React.memo(DropDownMedia);
