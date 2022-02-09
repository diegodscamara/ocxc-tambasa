import React, {useCallback, useContext, useEffect} from 'react';
import {StoreContext, ContainerContext} from '@oracle-cx-commerce/react-ui/contexts';
import Region from '@oracle-cx-commerce/react-components/region';
import Styled from '@oracle-cx-commerce/react-components/styled';
import {connect} from '@oracle-cx-commerce/react-components/provider';
import css from './styles.css';
import {getComponentData} from './selectors';

/**
* Container that holds all the widgets for the Purchase List Details Page
*/
const TmbProfilePurchaseListDetailsContainer = props => {
  const {purchaseListId, purchaseList} = props;
  const {regions = []} = props;

  const {action} = useContext(StoreContext);

  /**
  * Failure call back for the getPurchaseList action
  */
  const onNotOk = useCallback(
    ({error: {message = ''} = {}} = {}) => {
      action('notify', {level: 'error', message});
    },
    [action]
  );

  /**
  * Get the purchase list details for the specific purchase list id
  */
  useEffect(() => {
    if (purchaseListId) {
      action('getPurchaseList', {purchaseListId})
        .then(response => {
          if (response.ok === false) {
            onNotOk(response);
          }
        })
        .catch(error => {
          onNotOk({error});
        });
    }
  }, [action, onNotOk, purchaseListId]);

  return (
    <Styled id="TmbProfilePurchaseListDetailsContainer" css={css}>
      <div className="TmbProfilePurchaseListDetailsContainer">
        {purchaseList && (
          <>
            <ContainerContext.Provider value={purchaseList}>
              <section className="TmbProfilePurchaseListDetailsContainer__Section">
                {regions.map((regionId, index) => (
                  /*
                    Using region ids as keys causes unnecessary DOM reconciliation.

                    https://reactjs.org/docs/reconciliation.html#keys
                  */
                  // eslint-disable-next-line react/no-array-index-key
                  <Region key={index} regionId={regionId} />
                ))}
              </section>
            </ContainerContext.Provider>
          </>
        )}
      </div>
    </Styled>
  );
};

export default connect(getComponentData)(TmbProfilePurchaseListDetailsContainer);
