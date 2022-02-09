import React from 'react';
import Styled from '@oracle-cx-commerce/react-components/styled';
import { t } from '@oracle-cx-commerce/utils/generic';

import css from './styles.css';

const TmbProductContact = props => {

  const {
    formTitle,
    formText,
    namePlaceholder,
    phonePlaceholder,
    messagePlaceholder,
    formButton
  } = props;

  return (
    <Styled id="TmbProductContact" css={css}>
      <div className="TmbProductContact">
        <h2 className="TmbProductContact__Title">{t(formTitle)}</h2>
        <span className="TmbProductContact__Text">{t(formText)}</span>
        <form className="TmbProductContact__Form" action="#" target="_blank">
          <input className="TmbProductContact__Input" type="text" placeholder={t(namePlaceholder)} required></input>
          <input className="TmbProductContact__Input" type="email" placeholder="E-mail" required></input>
          <input className="TmbProductContact__Input" type="tel" placeholder={t(phonePlaceholder)} required></input>
          <textarea className="TmbProductContact__Input" name="message" rows="3" cols="30" placeholder={t(messagePlaceholder)} required></textarea>
          <button className="TmbProductContact__Button" type="button">{t(formButton)}</button>
        </form>
      </div>
    </Styled>
  );
};

export default TmbProductContact;
