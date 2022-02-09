import React, { useState } from 'react';
import Styled from '@oracle-cx-commerce/react-components/styled';
import Form from '@oracle-cx-commerce/react-components/form';

import Link from '@oracle-cx-commerce/react-components/link';

import { AiOutlineFacebook, AiOutlineInstagram, AiOutlineLinkedin, AiOutlineYoutube } from 'react-icons/ai';

import { t } from '@oracle-cx-commerce/utils/generic';

import css from './styles.css';

const TmbContactUs = props => {

  const {
    id,
    email = '',
    facebookLink,
    instagramLink,
    linkedinLink,
    youtubeLink,
    backgroundHeaderImage,
    formHeaderTitle,
    formHeaderDescription,
    labelName,
    labelEmailAddress,
    labelPhone,
    labelMessage,
    concludeButton,
    informationsCentralTitle,
    informationsCentralValue,
    informationsPhoneTitle,
    informationsPhoneValue,
    informationsEmailTitle,
    informationsEmailValue,
    informationsAddressTitle,
    informationsAddressValue,
    informationsSocialTitle,
    backgroundHeaderImageMob,
    formHeaderNavigation = ' FALE CONOSCO'
  } = props;


  const [inProgress, setInProgress] = useState(false);

  function phoneMask(e) {
    let inputValue = e.currentTarget.value;

    inputValue = inputValue
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(-\d{4})\d+?$/, '$1')

    e.currentTarget.value = inputValue;

    return inputValue;
  }

  return (
    <Styled id="TmbContactUs" css={css}>
      {backgroundHeaderImage && backgroundHeaderImage.src && (
        <div className="TmbContactUs__BackgroundImage">
          <img className="TmbContactUs__BackgroundImage" src={backgroundHeaderImage.src} alt="background" />
        </div>
      )}
      {backgroundHeaderImageMob && backgroundHeaderImageMob.src && (
        <div className="TmbContactUs__BackgroundImageMob">
          <img className="TmbContactUs__BackgroundImageMob" src={backgroundHeaderImageMob.src} alt="background" />
        </div>
      )}
      <div className={backgroundHeaderImage && backgroundHeaderImage.src ? "TmbContactUs__Container TmbContactUs__CustomMargin" : "TmbContactUs__Container"}>
        <div className="TmbContactUs_row">
          <div className="TmbContactUs_col">
            <div className="TmbContactUs_FormHeader">
              <div className="TmbContactUs__FormHeader-Navigation">
                <Link route={'/home'}>HOME /&nbsp;</Link>
                <Link route={'/contact-us'}>{t(formHeaderNavigation)}</Link>
              </div>
              <h1 className="TmbContactUs_FormHeader_Title">{t(formHeaderTitle)}</h1>
              <p className="TmbContactUs_FormHeader_Description">{t(formHeaderDescription)}</p>
            </div>
          </div>
        </div>
        <div className="TmbContactUs_row">
          <div className="TmbContactUs_col">
            <div className="TmbContactUs_FormContainer">
              <Form>
                {/* name */}
                <div>
                  <label className="label" htmlFor={`name-${id}`}>{t(labelName)}</label>
                  <input
                    type="text"
                    id={`firstName-${id}`}
                    name="name"
                    placeholder={t(labelName)}
                    maxLength="255"
                    autoComplete="given-name"
                    autoCapitalize="words"
                    required
                  />
                  <span className="validationMessage"></span>
                </div>

                {/* email */}
                <div>
                  <label className="label" htmlFor={`email-${id}`}>{t(labelEmailAddress)}</label>
                  <div className="ProfileRegistration__EmailField">
                    <input
                      type="email"
                      name="email"
                      id={`email-${id}`}
                      placeholder={t(labelEmailAddress)}
                      defaultValue={email}
                      maxLength="255"
                      autoComplete="email"
                      required
                    />
                    <span className="validationMessage"></span>
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="label" htmlFor={`phone-${id}`}>{t(labelPhone)}</label>
                  <div>
                    <input
                      type="tel"
                      name="phone"
                      id={`phone-${id}`}
                      placeholder={t(labelPhone)}
                      onChange={phoneMask}
                      maxLength="15"
                      minLength="15"
                      autoComplete="phone"
                      required
                    />
                    <span className="validationMessage"></span>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="label" htmlFor={`message-${id}`}>{t(labelMessage)}</label>
                  <div>
                    <textarea name="message" placeholder={t(labelMessage)}></textarea>
                    <span className="validationMessage"></span>
                  </div>
                </div>


                <div className="TmbContactUs_FormButton">
                  <button className="create-account-button-custom" type="submit" disabled={inProgress}>
                    {t(concludeButton)}
                  </button>
                </div>

              </Form>
            </div>
          </div>
          <div className="TmbContactUs_col">
            <div className="TmbContactUs_InformationsContainer">

              <div className="TmbContactUs_InformationsCentral">
                <div className="TmbContactUs_InformationsTitle">
                  {t(informationsCentralTitle)}
                </div>
                <div className="TmbContactUs_InformationsValue">
                  {t(informationsCentralValue)}
                </div>
              </div>

              <div className="TmbContactUs_InformationsPhone">
                <div className="TmbContactUs_InformationsTitle">
                  {t(informationsPhoneTitle)}
                </div>
                <div className="TmbContactUs_InformationsValue">
                  {t(informationsPhoneValue)}
                </div>
              </div>

              <div className="TmbContactUs_InformationsEmail">
                <div className="TmbContactUs_InformationsTitle">
                  {t(informationsEmailTitle)}
                </div>
                <div className="TmbContactUs_InformationsValue">
                  {t(informationsEmailValue)}
                </div>
              </div>

              <div className="TmbContactUs_InformationsAddress">
                <div className="TmbContactUs_InformationsTitle">
                  {t(informationsAddressTitle)}
                </div>
                <div className="TmbContactUs_InformationsValue">
                  {t(informationsAddressValue)}
                </div>
              </div>

              <div className="TmbContactUs_InformationsAddress">
                <div className="TmbContactUs_InformationsTitle">
                  {t(informationsSocialTitle)}
                </div>
                <div className="TmbContactUs_InformationsValue">
                  <Link className="TmbContactUs_InformationsSocial__Link" route={facebookLink}>
                    <AiOutlineFacebook className="TmbContactUs_InformationsSocialIcons" />
                  </Link>
                  <Link className="TmbContactUs_InformationsSocial__Link" route={instagramLink}>
                    <AiOutlineInstagram className="TmbContactUs_InformationsSocialIcons" />
                  </Link>
                  <Link className="TmbContactUs_InformationsSocial__Link" route={linkedinLink}>
                    <AiOutlineLinkedin className="TmbContactUs_InformationsSocialIcons" />
                  </Link>
                  <Link className="TmbContactUs_InformationsSocial__Link" route={youtubeLink}>
                    <AiOutlineYoutube className="TmbContactUs_InformationsSocialIcons" />
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </Styled>
  );
};

export default TmbContactUs;
