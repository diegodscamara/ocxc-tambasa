/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import React from 'react';
import Styled from '@oracle-cx-commerce/react-components/styled';
import css from './styles.css';
import {noop} from '@oracle-cx-commerce/utils/generic';

/**
 * Provides mobile view for actions on Purchase list
 * @param {*} props
 */
const ProfilePurchaseListActionButtonsPortal = props => {
  const {
    toggleActionButtonsPopover = noop,
    isListOwner,
    //Share
    textShareList,
    toggleShareModal = noop,
    // Edit
    textEditList,
    toggleEditModal = noop,
    //Copy
    textCopyList,
    toggleCopyModal,
    // Delete
    textDeleteList,
    toggleDeleteModal = noop
  } = props;

  const handleShareModal = () => {
    toggleActionButtonsPopover();
    toggleShareModal();
  };

  const handleEditModal = () => {
    toggleActionButtonsPopover();
    toggleEditModal();
  };

  const handleDeleteModal = () => {
    toggleActionButtonsPopover();
    toggleDeleteModal();
  };

  const handleCopyModal = () => {
    toggleActionButtonsPopover();
    toggleCopyModal();
  };

  return (
    <Styled id="ProfilePurchaseListActionButtonsPortal" css={css}>
      <div className="ProfilePurchaseListActionButtonsPortal">
        <div className="ProfilePurchaseListActionButtonsPortal__Buttons">
          {isListOwner && (
            <>
              <button
                onClick={handleShareModal}
                className={'ProfilePurchaseListActionButtonsPortal__Button'}
                aria-label={textShareList}
                title={textShareList}
                type="button"
                data-testid="popoverShareButton"
              >
                <span>{textShareList}</span>
              </button>

              <button
                onClick={handleEditModal}
                className={'ProfilePurchaseListActionButtonsPortal__Button'}
                aria-label={textEditList}
                title={textEditList}
                type="button"
                data-testid="popoverEditButton"
              >
                <span>{textEditList}</span>
              </button>
            </>
          )}

          <button
            onClick={handleCopyModal}
            className={'ProfilePurchaseListActionButtonsPortal__Button'}
            aria-label={textCopyList}
            title={textCopyList}
            type="button"
            data-testid="popoverCopyButton"
          >
            <span>{textCopyList}</span>
          </button>
          {isListOwner && (
            <button
              onClick={handleDeleteModal}
              className={'ProfilePurchaseListActionButtonsPortal__Button'}
              aria-label={textDeleteList}
              title={textDeleteList}
              type="button"
              data-testid="popoverDeleteButton"
            >
              <span>{textDeleteList}</span>
            </button>
          )}
        </div>
      </div>
    </Styled>
  );
};

export default ProfilePurchaseListActionButtonsPortal;
