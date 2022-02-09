import React, {useRef} from 'react';
import ActionIcon from '@oracle-cx-commerce/react-components/action-icon';
import CloseButton from '../components/close-button'
import PropTypes from 'prop-types';
import SearchBoxCommon from '../components/search-box-common';
import SearchIcon from '@oracle-cx-commerce/react-components/icons/search';
import Styled from '@oracle-cx-commerce/react-components/styled';
import {connect} from '@oracle-cx-commerce/react-components/provider';
import css from './mobile.css';
import {getComponentData} from '../selectors';

const TmbSearchBoxMobile = props => {
  const {
    records,
    searchAdjustments,
    locale,
    numberOfSuggestions = 5,
    persistSearchTerm = true,
    closeLinkAltText,
    searchIconAltText,
    actionClear,
    textEnterSearch
  } = props;

  const searchToggle = useRef(null);
  const searchInput = useRef(null);

  // If persistSearchTerm flag is set, use the original search to populate the search input box
  const originalSearch = searchAdjustments && searchAdjustments.originalTerms && searchAdjustments.originalTerms[0];
  const initialInputValue = persistSearchTerm ? originalSearch || '' : '';

  // Shows or hides the Search box window
  const toggleWindow = () => {
    searchToggle.current.checked = !searchToggle.current.checked;

    // If showing window, apply focus at the end of the current text input
    if (searchToggle.current.checked) {
      searchInput.current.focus();
      searchInput.current.selectionStart = searchInput.current.selectionEnd = searchInput.current.value.length;
    }
  };

  return (
    <Styled id="TmbSearchBoxMobile" css={css}>
      <div className="TmbSearchBoxMobile">
        <ActionIcon>
          <div
            role="button"
            onClick={toggleWindow}
            onKeyDown={event => {
              if (event.key === 'Enter') {
                toggleWindow();
              }
            }}
            tabIndex="0"
            aria-label={searchIconAltText}
          >
            <SearchIcon />
          </div>
        </ActionIcon>
        <input
          className="SearchBoxMobile__Toggle"
          id="SearchBoxMobile__Toggle"
          ref={searchToggle}
          type="checkbox"
          style={{display: 'none'}}
        />
        <div
          className="SearchBoxMobile__Backdrop"
          role="button"
          onClick={toggleWindow}
          onKeyDown={event => {
            if (event.key === 'Enter') {
              toggleWindow();
            }
          }}
          tabIndex="-1"
          aria-label={closeLinkAltText}
        />
        <aside className="SearchBoxMobile__Modal">
          <SearchBoxCommon
            records={records}
            searchToggle={searchToggle}
            searchInput={searchInput}
            locale={locale}
            numberOfSuggestions={numberOfSuggestions}
            initialInputValue={initialInputValue}
            actionClear={actionClear}
            textEnterSearch={textEnterSearch}
            isMobile={true}
            SearchIcon={
              <span className="SearchBoxMobile__SearchIcon">
                <SearchIcon />
              </span>
            }
            CloseButton={<CloseButton closeLinkAltText={closeLinkAltText} toggleWindow={toggleWindow} />}
          />
        </aside>
      </div>
    </Styled>
  );
};

TmbSearchBoxMobile.propTypes = {
  records: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  searchAdjustments: PropTypes.shape({originalTerms: PropTypes.arrayOf(PropTypes.string)}),
  locale: PropTypes.string.isRequired,
  numberOfSuggestions: PropTypes.number.isRequired,
  persistSearchTerm: PropTypes.bool.isRequired,
  closeLinkAltText: PropTypes.string.isRequired,
  searchIconAltText: PropTypes.string.isRequired,
  actionClear: PropTypes.string.isRequired,
  textEnterSearch: PropTypes.string.isRequired
};

TmbSearchBoxMobile.defaultProps = {
  searchAdjustments: undefined
};

export default connect(getComponentData)(TmbSearchBoxMobile);
