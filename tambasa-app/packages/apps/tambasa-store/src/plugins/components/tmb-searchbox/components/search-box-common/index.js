import React, {useCallback, useContext, useState} from 'react';
import TypeaheadResultsPanel from '../typeahead-results-panel';
import Form from '@oracle-cx-commerce/react-components/form';
import {StoreContext} from '@oracle-cx-commerce/react-ui/contexts';
import Styled from '@oracle-cx-commerce/react-components/styled';
import css from './styles.css'
import {t} from '@oracle-cx-commerce/utils/generic';

const SearchBoxCommon = props => {
  const {
    records,
    searchToggle,
    searchInput,
    locale,
    numberOfSuggestions,
    initialInputValue,
    actionClear,
    textEnterSearch,
    isMobile,
    SearchIcon,
    CloseButton
  } = props;

  const [inputValue, setInputValue] = useState(initialInputValue);

  const {action} = useContext(StoreContext);

  const SEARCH_QUERY_PARAM = 'Ntt';

  /**
   * Called when the search text is updated.
   */
  const onInput = useCallback(
    event => {
      const {value} = event.target;
      setInputValue(value);

      // Issue a typeahead request if input is at least one character for
      // Chinese, Japanese and Korean locales, or two characters for all other locales
      if (value.length > (locale.startsWith('zh') || locale.startsWith('ja') || locale.startsWith('ko') ? 0 : 1)) {
        action('typeahead', {text: value, maxResults: numberOfSuggestions || 5});
      } else {
        action('clearTypeahead');
      }
    },
    [action, setInputValue, numberOfSuggestions, locale]
  );

  /**
   * Called when the search form is submitted.
   */
  const onSubmit = useCallback(() => {
    // Don't submit search if input is empty
    if (!inputValue.trim()) {
      return false;
    }

    action('clearTypeahead');

    // Close search popover
    if (searchToggle.current) {
      searchToggle.current.checked = false;
    }
  }, [action, inputValue, searchToggle]);

  /**
   * Called when an option is selected from the typeahead panel.
   */
  const onSelectTypeahead = useCallback(() => {
    action('clearTypeahead');

    // Close search popover
    if (searchToggle.current) {
      searchToggle.current.checked = false;
    }
  }, [action, searchToggle]);

  /**
   * Called when the search form is reset ("Clear" button pressed).
   */
  const onReset = useCallback(() => {
    setInputValue('');
    action('clearTypeahead');
    searchInput.current.focus();
  }, [action, setInputValue, searchInput]);
  
  /**
   * @author guilherme.vieira
   * @description we need to close the window when the shopper clicks out the box
   * @param {JSX.Element.event} event 
   * @returns {undefined}
   */
   const handleBlur = (event) => {
    const element = event.relatedTarget
    const isItAnAnchor = element && element.tagName === "A"

    if(element && element.classList.contains('SearchBoxDesktop__SearchIcon')) {
      element.click()
      return onSubmit()
    }

    if(element && isItAnAnchor) {

      element.click()
      return onReset()
    }

    setInputValue('');
    action('clearTypeahead');
  }

  return (
    <Styled id="SearchBoxCommon" css={css}>
      <span className="SearchBoxCommon__Content">
        <div className="SearchBoxCommon__Buttons">
          <div className="SearchBoxCommon__Form">
            <Form method="GET" action="search" onSubmit={onSubmit}>
              {/* Search icon on the left side if mobile. */}
              {isMobile && SearchIcon}
              <input
                name={SEARCH_QUERY_PARAM}
                className="SearchBoxCommon__Input"
                ref={searchInput}
                type="search"
                value={inputValue}
                placeholder={t(textEnterSearch)}
                autoComplete="off"
                onChange={onInput}
                onBlur={handleBlur}
              />
              <input
                type="reset"
                className="SearchBoxCommon__ClearButton"
                style={{visibility: inputValue ? 'visible' : 'hidden'}}
                value={t(actionClear)}
                onClick={onReset}
              />
              {/* Search icon on the right side if desktop. 
              Disable the search button for desktop if there is no input */}
            {!isMobile && SearchIcon && <SearchIcon isDisabled={!inputValue} />}
            </Form>
          </div>
          {/* Button to close the search modal for mobile. */}
          {isMobile && CloseButton}
        </div>
        <TypeaheadResultsPanel records={records} inputValue={inputValue} onSelectTypeahead={onSelectTypeahead} />
      </span>
    </Styled>
  );
};

/**
 * Use an @oracle-cx-commerce/react-ui.connect component to arrange for the component
 * to be rendered when its state changes.
 */
export default SearchBoxCommon;
