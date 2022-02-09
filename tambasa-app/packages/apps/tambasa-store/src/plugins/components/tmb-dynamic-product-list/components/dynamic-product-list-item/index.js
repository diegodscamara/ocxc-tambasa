import {ProductContext} from '@oracle-cx-commerce/react-ui/contexts';
import React, {useState} from 'react';
import Region from '@oracle-cx-commerce/react-components/region';
import Styled from '@oracle-cx-commerce/react-components/styled';
import css from './styles.css';

/**
 * A component for a product result item.
 *
 * @param {object} props.record The product result data, from the getSearchResults selector
 * @param {array} props.regions The regions to display in the product result, defined in page layout.
 */
const DynamicProductListItem = props => {
  const {record = {attributes: {}}, regions} = props;

  // Used to keep track of color swatch selections. Object with properties:
  // - colorParameters: a url segment with query parameters for pre-selecting the correct color variant
  // - imageUrl: url for the product image in the selected color variant
  const [selection, setSelection] = useState({});

  // Get product route
  let route = record.attributes['product.route'] && record.attributes['product.route'][0];
  if (route && route.charAt(0) === '/') {
    route = route.substring(1);
  }
  if (selection && selection['colorParameters']) {
    // If a color variant has been set by selecting a swatch, append this selection to the url
    route += selection['colorParameters'];
  }

  return (
    // Pass down product context to any children.
    <Styled id="DynamicProductListItem" css={css}>
      <ProductContext.Provider value={{record, route, selection, setSelection}}>
        <div className="DynamicProductListItem__Product Container__Section">
          {regions.map((regionId, index) => (
            /*
                Using region ids as keys causes unnecessary DOM reconciliation.
                  
                https://reactjs.org/docs/reconciliation.html#keys
              */
            <Region key={index} regionId={regionId} /> // eslint-disable-line react/no-array-index-key
          ))}
        </div>
      </ProductContext.Provider>
    </Styled>
  );
};

export default DynamicProductListItem;
