import React from 'react';
import Region from './components/region';
import Styled from '@oracle-cx-commerce/react-components/styled';
import css from './styles.css';

/**
 * Renders region ids defined in container and automatically controls
 * mobile and desktop view based on view port.
 *
 * @param {*} props
 */
const TmbProfileContainer = props => {
  const { regions = [], className = '' } = props;

  return (
    <Styled id="TmbProfileContainer" css={css}>
      <section className={`ResponsiveContainer__Section ${className}`.trim()}>
        {regions.map((regionId, index) => (
          <Region key={index} regionId={regionId} {...props}/>
        ))}
      </section>
    </Styled>
  );
};

export default TmbProfileContainer;
