import React from 'react'
import ReactDOM from 'react-dom'
import ProfilePendingApprovalModal from '../../components/utils/components/profile-pending-approval-modal'
import {shopperSelector} from '../../selectors/shopper'

const createAndPlacePendingModalElement = () => {
    let pendingAccountConfirmationModal = document.querySelector('div.pendingAccountConfirmationModal')
    const body = document.querySelector('body')

    if(!pendingAccountConfirmationModal) {
        pendingAccountConfirmationModal = document.createElement('div')
        pendingAccountConfirmationModal.classList.add('pendingAccountConfirmationModal')
        body.prepend(pendingAccountConfirmationModal)
    }

    const handleDismiss = () => {
      pendingAccountConfirmationModal.style.display = 'none'
      body.style.overflow = 'auto'
      window.removeEventListener('keydown', handleKeyDown)
    }

    const handleKeyDown = event => {
      const { key } = event
      if(key === "Escape" || key === "Enter") {
        handleDismiss()
      }
    }

    const modalProps = {
      title: 'Aprovação de conta em andamento',
      description: 'A sua conta está em fase de aprovação, e por isso não é possível fazer compras no momento. Não se preocupe, logo sua conta estará liberada!',
      buttonLabel: 'Entendido!',
      handleDismiss,
      handleKeyDown
    }

    ReactDOM.render(
      <ProfilePendingApprovalModal { ...modalProps }/>,
      pendingAccountConfirmationModal
    )

    body.style.overflow = 'hidden'
    pendingAccountConfirmationModal.style.display = 'flex'
}

export default ({subscribeDispatch}) => {
    return subscribeDispatch((action, state) => {
        const {type} = action;
        const {profile: currentProfile, isUserLoggedIn} = shopperSelector(state)
        const hasModalBeenDisplayed = JSON.parse(window.localStorage.getItem('modalShown'))

        if (type === 'loginComplete' || (type === 'endpointResolved' && action.endpointId && action.endpointId === 'getCurrentProfile')) {
          const externalId = currentProfile.dynamicProperties &&
            currentProfile.dynamicProperties.find(dp => dp.id === "tam_external_id").value
          
          if(isUserLoggedIn && !hasModalBeenDisplayed && (!externalId || externalId === "" || externalId.toLowerCase() === "empty")) {
            createAndPlacePendingModalElement()
            window.localStorage.setItem('modalShown', true)
          }

        } else if (type === "logoutSuccess" || type === "logoutComplete") {
          const hasProperty = JSON.parse(window.localStorage.getItem('modalShown'))
          if(hasProperty) window.localStorage.setItem('modalShown', false)
        }
    });
};