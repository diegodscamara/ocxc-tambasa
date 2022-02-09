import React from 'react';
import {connect} from '@oracle-cx-commerce/react-components/provider';
import Styled from '@oracle-cx-commerce/react-components/styled';
import css from './styles.css';
import Img from '@oracle-cx-commerce/react-components/img';
import {useNumberFormatter} from '@oracle-cx-commerce/react-components/utils/hooks';
import {getSearchResults} from './selectors';
import PropTypes from 'prop-types';

/**
 * Component that displays details about the typeahead search results
 * (i.e., a pop up with the results, if there are any).
 */
const SearchResultsPanel = props => {
  const {records, onSelect} = props;
  const formatCurrency = useNumberFormatter({style: 'currency'});

  return (
    <Styled id="PurchaseList__SearchResults" css={css}>
      {records && records.length > 0 && (
        <div className="PurchaseList__SearchResults___Wrapper">
          <div className={'TmbPurchaseList__SearchResults'}>
            {records &&
              records.map((record, index) => (
                <div
                  key={record.records[0].attributes['product.repositoryId'][0]}
                  className={`${
                    index > 0
                      ? 'PurchaseList__SearchResults_RecordRow_border'
                      : 'PurchaseList__SearchResults_RecordRow_noBorder'
                  }`}
                >
                  <button
                    className="PurchaseList__SearchResults_RecordRow"
                    type="button"
                    data-testid={`PurchaseList__SearchResults_${index}`}
                    onClick={() => {
                      onSelect(record.records[0].attributes, record.numRecords);
                    }}
                  >
                    <div className="PurchaseList__SearchResults_RecordColumn PurchaseList__SearchResults_Image">
                      <Img
                        src={
                          record.records[0].attributes['sku.listingThumbImageURL']
                            ? record.records[0].attributes['sku.listingThumbImageURL'][0]
                            : record.records[0].attributes['product.primaryThumbImageURL'][0]
                        }
                        title={record.records[0].attributes['product.displayName']}
                        alt={record.records[0].attributes['product.displayName']}
                      />
                    </div>
                    <div className="PurchaseList__SearchResults_RecordColumn PurchaseList__SearchResults_Name">
                      <div>
                        <b>{record.records[0].attributes['product.displayName']}</b>
                      </div>
                      <div>{`SKU: ${record.records[0].attributes['sku.repositoryId']}`}</div>
                      <b className='PurchaseList__SearchResults_Price--Mobile'>
                        {
                          (record.records[0].attributes['sku.activePrice'] && 
                          record.records[0].attributes['sku.activePrice'][0] &&
                          formatCurrency(record.records[0].attributes['sku.activePrice'][0], props.priceListGroup))
                          || <>R$ ---</>
                        }
                      </b>
                    </div>
                    <div className="PurchaseList__SearchResults_RecordColumn PurchaseList__SearchResults_Price">
                      <div className="PurchaseList__SearchResults_PriceItem">
                        <b>
                        {
                          (record.records[0].attributes['sku.activePrice'] && 
                          record.records[0].attributes['sku.activePrice'][0] &&
                          formatCurrency(record.records[0].attributes['sku.activePrice'][0], props.priceListGroup))
                          || <>R$ ---</>
                        }
                        </b>
                      </div>
                    </div>
                  </button>
                </div>
              ))}
          </div>
        </div>
  
      )}
    </Styled>
  );
};

SearchResultsPanel.propTypes = {
  /** Callback function to be invoked on selecting a product in the search result */
  onSelect: PropTypes.func.isRequired,
  /** The search result returned to be displayed in the UI */
  records: PropTypes.arrayOf(PropTypes.object).isRequired
};

SearchResultsPanel.defaultProps = {};

export default connect(getSearchResults)(SearchResultsPanel);
