import React, {useContext} from 'react';
import {ContainerContext} from '@oracle-cx-commerce/react-ui/contexts';
import Styled from '@oracle-cx-commerce/react-components/styled';
import css from './styles.css';
import {useDateFormatter} from '@oracle-cx-commerce/react-components/utils/hooks';
import {useComponentData} from './selectors';

/**
* Widget that displays basic purchase list related information
* such as purchase list name, purchase list owner, purchase list description,
* last modified date, last modified by, etc.
*/
const TmbProfilePurchaseListSummaryInformation = props => {
  //resources
  const {
    textPurchaseListOwner,
    textLastModified,
    textModifiedBy,
    textListSharedWithAccount,
    textListSharedWithEmail,
    textListNotShared,
    textListSharedWithBoth
  } = props;

  //container context
  const {
    id: purchaseListId,
    name: purchaseListName,
    owner = {},
    lastModifiedBy = {},
    lastModifiedDate,
    description
  } = useContext(ContainerContext);

  const {sharedWith, isListOwner} = useComponentData();

  const formatDate = useDateFormatter();

  let sharedWithInfo;

  if (!sharedWith.organizationSharingEnabled && !sharedWith.emailSharingEnabled) {
    sharedWithInfo = (
      <div className="TmbProfilePurchaseListSummaryInformation__Row">
        <div className="TmbProfilePurchaseListSummaryInformation__TextCol">
          <span className="TmbProfilePurchaseListSummaryInformation__Text">{textListNotShared}</span>
        </div>
      </div>
    );
  } else if (sharedWith.organizationSharingEnabled && sharedWith.emailSharingEnabled) {
    sharedWithInfo = (
      <div className="TmbProfilePurchaseListSummaryInformation__Row">
        <div className="TmbProfilePurchaseListSummaryInformation__TextCol">
          <span className="TmbProfilePurchaseListSummaryInformation__Text">{textListSharedWithBoth}</span>
        </div>
      </div>
    );
  } else if (sharedWith.organizationSharingEnabled) {
    sharedWithInfo = (
      <div className="TmbProfilePurchaseListSummaryInformation__Row">
        <div className="TmbProfilePurchaseListSummaryInformation__TextCol">
          <span className="TmbProfilePurchaseListSummaryInformation__Text">{textListSharedWithAccount}</span>
        </div>
      </div>
    );
  } else if (sharedWith.emailSharingEnabled) {
    sharedWithInfo = (
      <div className="TmbProfilePurchaseListSummaryInformation__Row">
        <div className="TmbProfilePurchaseListSummaryInformation__TextCol">
          <span className="TmbProfilePurchaseListSummaryInformation__Text">{textListSharedWithEmail}</span>
        </div>
      </div>
    );
  }

  return (
    <Styled id="TmbProfilePurchaseListSummaryInformation" css={css}>
      {purchaseListId && (
        <div className="TmbProfilePurchaseListSummaryInformation">
          <h1>{purchaseListName}</h1>
          {/* Purchase list owner */}
          <div className="TmbProfilePurchaseListSummaryInformation__Row">
            <div className="TmbProfilePurchaseListSummaryInformation__LabelCol">
              <span className="TmbProfilePurchaseListSummaryInformation__Label">{textPurchaseListOwner}</span>
            </div>
            <div className="TmbProfilePurchaseListSummaryInformation__ValueCol">
              <span className="TmbProfilePurchaseListSummaryInformation__Value">{`${owner.firstName} ${owner.lastName}`}</span>
            </div>
          </div>
          {/* Purchase list last modified information */}
          {isListOwner && (
            <>
              {/* Purchase list last modified date */}
              <div className="TmbProfilePurchaseListSummaryInformation__Row">
                <div className="TmbProfilePurchaseListSummaryInformation__LabelCol">
                  <span className="TmbProfilePurchaseListSummaryInformation__Label">{textLastModified}</span>
                </div>
                <div className="TmbProfilePurchaseListSummaryInformation__ValueCol">
                  <span className="TmbProfilePurchaseListSummaryInformation__Value">
                    {formatDate(new Date(lastModifiedDate))}
                  </span>
                </div>
              </div>
              {/* Purchase list last modified by */}
              <div className="TmbProfilePurchaseListSummaryInformation__Row">
                <div className="TmbProfilePurchaseListSummaryInformation__LabelCol">
                  <span className="TmbProfilePurchaseListSummaryInformation__Label">{textModifiedBy}</span>
                </div>
                <div className="TmbProfilePurchaseListSummaryInformation__ValueCol">
                  <span className="TmbProfilePurchaseListSummaryInformation__Value">{`${lastModifiedBy.firstName} ${lastModifiedBy.lastName}`}</span>
                </div>
              </div>
            </>
          )}
          {/* Purchase list description */}
          <div className="TmbProfilePurchaseListSummaryInformation__Row">
            <div className="TmbProfilePurchaseListSummaryInformation__TextCol">
              <span className="TmbProfilePurchaseListSummaryInformation__Text">{description}</span>
            </div>
          </div>

          {/* Purchase list sharing information */}
          {isListOwner && sharedWithInfo}
        </div>
      )}
    </Styled>
  );
};

export default TmbProfilePurchaseListSummaryInformation;
