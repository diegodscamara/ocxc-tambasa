import React from 'react'
import Styled from '@oracle-cx-commerce/react-components/styled'
import css from './styles.css'

const TmbSpinner = props => {
    return (
        <Styled id="TmbSpinner" css={css}>
            <div className={`TmbSpinner ${!props.show ? 'Dismiss' : ''}`}>
                <div className="Spinner"></div>
            </div>
        </Styled>
    )
}

export default TmbSpinner