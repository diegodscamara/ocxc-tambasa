import React, { useEffect } from 'react'
import {GrClose} from 'react-icons/gr'

const ProfilePendingApprovalModal = props => {
    const {
        title,
        description,
        buttonLabel,
        handleDismiss,
        handleKeyDown
    } = props

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown)
    }, [])

    return (
        <div className="ProfilePendingApprovalModal__Wrapper">
            <div className="ProfilePendingApprovalModal__Container">
                <GrClose className="ProfilePendingApprovalModal__Icon" onClick={() => handleDismiss()}/>
                <div className="ProfilePendingApprovalModal__Header">
                    <img className="ProfilePendingApprovalModal__Header__Icon" 
                        src="/file/general/wall-clock.png" 
                        alt="Pending Account" 
                    />
                </div>
                <div className="ProfilePendingApprovalModal__Body">
                    <h3 className="ProfilePendingApprovalModal__Title">{title}</h3>
                    <p className="ProfilePendingApprovalModal__Description">{description}</p>
                    <button className="ProfilePendingApprovalModal__Button" onClick={() => handleDismiss()}>{buttonLabel}</button>
                </div>
            </div>
        </div>
    )
}

export default ProfilePendingApprovalModal