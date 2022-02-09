import React, {useState, useContext, useCallback} from 'react';
import {ContainerContext} from '@oracle-cx-commerce/react-ui/contexts';
import Styled from '@oracle-cx-commerce/react-components/styled';
import css from './styles.css';
import Popover from '@oracle-cx-commerce/react-components/popover';
import MoreHorizontalIcon from '@oracle-cx-commerce/react-components/icons/more-horizontal-icon';
import ProfilePurchaseListActionButtonsPortal from './components/profile-purchase-list-action-buttons-portal';
import EditPurchaseList from './components/edit-purchase-list';
import DeletePurchaseList from './components/delete-purchase-list';
import CopyPurchaseList from './components/copy-purchase-list';
import SharePurchaseList from './components/share-purchase-list';
import {useComponentData} from './selectors';

/**
* Displays Profile Purchase List Action Buttons to edit/copy/delete/share a purchase list
* @param {*} props
*/
const TmbProfilePurchaseListActionButtons = props => {
  const {
    textShareList,
    textEditList,
    textCopyList,
    textDeleteList,
    textActionButtonsSeparator,
    closeLinkAltText,
    actionShowMore
  } = props;

  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCopyModal, setShowCopyModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showActionButtonsPopover, setShowActionButtonsPopover] = useState(false);

  const {id: purchaseListId} = useContext(ContainerContext);
  const {orgId, isListOwner} = useComponentData();

  // handlers
  /**
  * Handler to open/close Action Buttons popover
  */
  const toggleActionButtonsPopover = useCallback(() => {
    setShowActionButtonsPopover(!showActionButtonsPopover);
  }, [showActionButtonsPopover]);

  /**
  * Handler to open/close Edit Purchase List modal
  */
  const toggleEditModal = useCallback(() => {
    setShowEditModal(!showEditModal);
  }, [showEditModal]);

  /**
  * Handler to open/close Delete Purchase List modal
  */
  const toggleDeleteModal = useCallback(() => {
    setShowDeleteModal(!showDeleteModal);
  }, [showDeleteModal]);

  /**
  * Handler to open/close Copy Purchase List modal
  */
  const toggleCopyModal = useCallback(() => {
    setShowCopyModal(!showCopyModal);
  }, [showCopyModal]);

  /**
  * Handler to open/close Share Purchase List modal
  */
  const toggleShareModal = useCallback(() => {
    setShowShareModal(!showShareModal);
  }, [showShareModal]);

  return (
    <Styled id="TmbProfilePurchaseListActionButtons" css={css}>
      {purchaseListId && (
        <div className="TmbProfilePurchaseListActionButtons">
          <div className="TmbProfilePurchaseListActionButtonsMobile">
            <button
              className="TmbProfilePurchaseListActionButtonsMobile__MoreHorizontalIcon"
              onClick={toggleActionButtonsPopover}
              type="button"
              aria-label={actionShowMore}
            >
              <MoreHorizontalIcon />
            </button>

            <Popover
              show={showActionButtonsPopover}
              onClose={toggleActionButtonsPopover}
              closeIconTitle={closeLinkAltText}
            >
              <ProfilePurchaseListActionButtonsPortal
                toggleEditModal={toggleEditModal}
                toggleDeleteModal={toggleDeleteModal}
                toggleCopyModal={toggleCopyModal}
                toggleShareModal={toggleShareModal}
                toggleActionButtonsPopover={toggleActionButtonsPopover}
                isListOwner={isListOwner}
                {...props}
              ></ProfilePurchaseListActionButtonsPortal>
            </Popover>
          </div>

          <div className="TmbProfilePurchaseListActionButtonsDesktop">
            {isListOwner && (
              <>
                <button
                  onClick={toggleShareModal}
                  className="TmbProfilePurchaseListActionButtonsDesktop__Button"
                  aria-label={textShareList}
                  title={textShareList}
                  type="button"
                  data-testid="shareButton"
                >
                  {textShareList}
                </button>

                <span className="TmbProfilePurchaseListActionButtonsDesktop__Separator">{textActionButtonsSeparator}</span>

                <button
                  onClick={toggleEditModal}
                  className="TmbProfilePurchaseListActionButtonsDesktop__Button"
                  aria-label={textEditList}
                  title={textEditList}
                  type="button"
                  data-testid="editButton"
                >
                  {textEditList}
                </button>

                <span className="TmbProfilePurchaseListActionButtonsDesktop__Separator">{textActionButtonsSeparator}</span>
              </>
            )}

            <button
              onClick={toggleCopyModal}
              className="TmbProfilePurchaseListActionButtonsDesktop__Button"
              aria-label={textCopyList}
              title={textCopyList}
              type="button"
              data-testid="copyButton"
            >
              {textCopyList}
            </button>
            {isListOwner && (
              <>
                <span className="TmbProfilePurchaseListActionButtonsDesktop__Separator">{textActionButtonsSeparator}</span>

                <button
                  onClick={toggleDeleteModal}
                  className="TmbProfilePurchaseListActionButtonsDesktop__Button"
                  aria-label={textDeleteList}
                  title={textDeleteList}
                  type="button"
                  data-testid="deleteButton"
                >
                  {textDeleteList}
                </button>
              </>
            )}
          </div>
        </div>
      )}

      <CopyPurchaseList toggleCopyModal={toggleCopyModal} showCopyModal={showCopyModal} {...props}></CopyPurchaseList>

      {isListOwner && (
        <>
          <SharePurchaseList
            toggleShareModal={toggleShareModal}
            showShareModal={showShareModal}
            orgId={orgId}
            {...props}
          ></SharePurchaseList>

          <EditPurchaseList
            toggleEditModal={toggleEditModal}
            showEditModal={showEditModal}
            {...props}
          ></EditPurchaseList>

          <DeletePurchaseList
            toggleDeleteModal={toggleDeleteModal}
            showDeleteModal={showDeleteModal}
            {...props}
          ></DeletePurchaseList>
        </>
      )}
    </Styled>
  );
};

export default TmbProfilePurchaseListActionButtons; 