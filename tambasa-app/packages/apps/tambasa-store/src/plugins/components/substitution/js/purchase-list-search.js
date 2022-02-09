import React, { useRef, useState, useEffect, useCallback } from 'react';
import SearchIcon from '@oracle-cx-commerce/react-components/icons/search';
import Styled from '@oracle-cx-commerce/react-components/styled';
import css from '@oracle-cx-commerce/react-widgets/profile/contact-registration-requests/components/search/styles.css';
import PropTypes from 'prop-types';

/**
 * @warning this components is aliased 'cause for some reason the clearButton component
 * is not receiving any data from parent (i suppose that a parent component is generating a 
 * re-rendering)
 */

/**
 * This component is used to fetch the list based on the input term provided.
 * The input term is passed to the parent component.
 * This component, can also clear the search term using the close button.
 * @param {*} props  Includes props from the parent component
 */
const Search = props => {
    const {
        dataTestId = '',
        className = '',
        size = '20',
        searchInput,
        placeholderLabel,
        nameValue,
        searchIconAltText
    } = props;

    const searchRef = useRef(null);

    /**
     * searchTerm is used in this component, to make the close button visible.
     */
    const [searchTerm, setSearchTerm] = useState('');

    /**
     * This is an eventHandler method, which set the searchFilter value in the parent component.
     * @param {*} event
     */
    const handleValueChange = event => {
        setSearchTerm(event.target.value);
    };
    
    const trackKeys = event => {
        if (event.key === 'Enter') {
            searchInput(event.target.value);
        }
    }

    /**
     * This is an eventHandler method, which set the searchFilter value in the parent component.
     * @param {*} event
     */
    const onClick = useCallback(() => {
        setSearchTerm(searchRef.current.value);
        searchInput(searchRef.current.value);
    }, [searchInput]);

    // const { searchRef, searchInput, searchTerm, clearInputCallback } = props;
    const [derivedClass, setDerivedClass] = useState(
        `ClearButton${searchTerm ? '  ClearButton--visible' : ' ClearButton--hidden'}`
    );

    /**
     * As we are using useState, the value of input is not cleared from UI immediately.
     * So iterating through the input form and setting the value as empty.
     * Also updating the parent components search filter.
     */
    const clearSearchBox = () => {
        searchRef.current.value = '';
        searchInput('');
        setDerivedClass('ClearButton ClearButton--hidden');
    };

    useEffect(() => {
        setDerivedClass(
            `ClearButton${searchTerm && searchRef.current.value && searchRef.current.value !== ""
                ? ' ClearButton--visible'
                : ' ClearButton--hidden'}`
        );
    }, [derivedClass, searchTerm, searchRef]);

    return (
        <Styled css={css}>
            <div className={`Search__Container ${className}`} data-testid={dataTestId}>
                <SearchIcon
                    role="button"
                    onClick={onClick}
                    aria-label={searchIconAltText}
                    className="SearchComponent__SearchIcon"
                ></SearchIcon>
                <label htmlFor={nameValue}>
                    <input
                        name="SearchComponent"
                        type="text"
                        size={size}
                        placeholder={placeholderLabel}
                        id={nameValue}
                        autoComplete="off"
                        className="Search__SearchText"
                        aria-label={placeholderLabel}
                        onChange={handleValueChange}
                        onKeyPress={trackKeys}
                        ref={searchRef}
                    ></input>
                </label>
                <div className={derivedClass}>
                    <input type="reset" className="ClearButton__Reset" onClick={clearSearchBox}></input>
                </div>
            </div>
        </Styled>
    );
};

Search.propTypes = {
    /**
     * A react useRef element to keep track of the search term
     */
    searchRef: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({ current: PropTypes.any })]),
    /**
     * The search input text box
     */
    searchInput: PropTypes.string,
    /**
     * The search value
     */
    searchTerm: PropTypes.string,
    /**
     * The htmlValue for label tag
     */
    nameValue: PropTypes.string.isRequired
};

Search.defaultProps = {
    searchTerm: '',
    searchInput: '',
    searchRef: ''
};

export default Search;
