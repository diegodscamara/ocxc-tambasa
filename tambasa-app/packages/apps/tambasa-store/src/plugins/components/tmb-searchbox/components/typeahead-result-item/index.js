import React from 'react';
import Link from '@oracle-cx-commerce/react-components/link';
import {PAGE_SEARCH_LINK} from '@oracle-cx-commerce/commerce-utils/constants';

/* eslint-disable react/no-danger */

const TypeaheadResultItem = props => {
  const {record, inputValue, onSelectTypeahead} = props;

  let keyword = record.attributes['keyword.terms'] && record.attributes['keyword.terms'][0];
  const route = `${PAGE_SEARCH_LINK}?Ntt=${keyword}`;

  // Bold typeahead sub-strings to match searched term
  if (inputValue && inputValue.length > 0) {
    try {
      const regex = new RegExp(`(${inputValue})`, 'gi');
      keyword = keyword.toString().replace(regex, '<b>$1</b>');
    } catch (error) {
      keyword = keyword.toString();
    }
  }

  // Display a link to the product details page.
  return (
    <div>
      <Link className="TypeaheadResultItem" href={route} onClick={onSelectTypeahead}>
        <p dangerouslySetInnerHTML={{__html: keyword}} />
      </Link>
    </div>
  );
};

export default TypeaheadResultItem;
