
import React, { useCallback, useContext, useState } from 'react';
import Alert from '@oracle-cx-commerce/react-components/alert';
import Form from './components/form';
import NotifyAuthSuccessAndNavigate from './components/notifyauthsuccess-navigate';
import { ProfileCustomProperties } from './components/profile-custom-properties';
import { StoreContext } from '@oracle-cx-commerce/react-ui/contexts';
import Styled from '@oracle-cx-commerce/react-components/styled';
import { connect } from '@oracle-cx-commerce/react-components/provider';
import css from './styles.css';
import { fetchCommonResources } from '@oracle-cx-commerce/fetchers/resources';
import { fetchShopperSettings } from '@oracle-cx-commerce/fetchers/merchant-settings';
import { getPageData } from './selectors';
import { passwordHelpers } from '@oracle-cx-commerce/react-components/utils';
import { useCommonResourcesFetcher } from '@oracle-cx-commerce/fetchers/resources/hooks';
import { useShopperSettingsFetcher } from '@oracle-cx-commerce/fetchers/merchant-settings/hooks';

import TmbSpinner from '../utils/components/tmb-spinner'
/**
 * export fetchers to load common resources & shopper settings (password policies)
 * and shopper custom properties into the state during server-side rendering.
 */
export const fetchers = [fetchCommonResources, fetchShopperSettings];

/**
 * Displays a Registration form to create a component.
 * @param {*} props - includes labels of the input fields.
 */

const TmbProfileRegistration = props => {
  const {
    id,
    defaultAutoLoginSuccessPage = 'noredirect',
    alertAccountCreated,
    alertCreateProfileEmailSentSuccessful,
    alertCreateProfileSuccessful,
    labelEmailAddress,
    labelEmailUpdates,
    labelFirstName,
    labelGdprConsentGranted,
    labelLastName,
    labelCpf,
    labelStateRegistration,
    labelPhone,
    labelConfirmEmail,
    buttonAdvance,
    formTitleRegister,
    formTitleDelivery,
    labelCep,
    labelSreet,
    labelNumber,
    labelComplement,
    labelNeighborhood,
    labelCity,
    labelState,
    alertCreateProfileSuccessfulTitle,
    alertCreateProfileSuccessfulText,
    alertCreateProfileSuccessfulButton,
    concludeButton,
    labelNo,
    labelPassword,
    labelPasswordConfirm,
    alertPasswordNotMatched,
    labelYes,
    requireGDPRP13nConsent,
    secureEmailEnabled,
    firstName = '',
    lastName = '',
    email = '',
    cpf = '',
    phone = '',
    confirmEmail = '',
    cep = '',
    street = '',
    number = '',
    complement = '',
    neighborhood = '',
    city = '',
    state = '',
    autoLogin = true,
  } = props;

  const store = useContext(StoreContext);
  const { action } = store;
  const [isB2B, setIsB2B] = useState(false)
  /**
   * invoke fetcher hook to load common resources, shopper custom properties & shopper custom properties
   * into state during client side rendering
   * this will not perform any task if state already has shopper custom properties
   * This is effective if SSR didn't populate the state with shopper custom properties data
   */

  useCommonResourcesFetcher(store);
  useShopperSettingsFetcher(store);

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [inProgress, setInProgress] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [accountCreationStatus, setAccountCreationStatus] = useState('');
  const [values, setValues] = useState({
    email: props.email
  });
  const [isAddressFormSpinnerVisible, setIsAddressFormSpinnerVisible] = useState(false)

  /**
   * success callback of create account.
   */
  const onOk = useCallback(() => {
    setFormSubmitted(true);
    if (props.authenticated) {
      action('notify', { level: 'info', message: alertCreateProfileSuccessful });
    }
  }, [action, alertCreateProfileSuccessful, props.authenticated]);

  /**
   * failure callback of create account.
   */
  const onNotOk = useCallback(({ error }) => {
    setAccountCreationStatus(error.message);
  }, []);

  /**
   * method to get the password policies using passwordHelpers utility js.
   */
  function getEmbeddedAssistance() {
    const policies = props.passwordPolicies;
    const embeddedAssistance = passwordHelpers.getEmbeddedAssistence(policies, props.commonResources);

    return embeddedAssistance;
  }

  function verifyCpf(cpf) {
    let cpfIsValid = true;

    if (!cpf) return false;

    let strCPF = cpf.replace(/[^\d]+/g, '');
    var rest;
    var sum = 0;
    var i = 0;
    if (strCPF == '00000000000' || strCPF == '11111111111' || strCPF == '22222222222' || strCPF == '33333333333' || strCPF == '44444444444' || strCPF == '55555555555' || strCPF == '66666666666' || strCPF == '77777777777' || strCPF == '88888888888' || strCPF == '99999999999' || strCPF == '') cpfIsValid = false;

    for (i = 1; i <= 9; i++) sum = sum + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
    rest = (sum * 10) % 11;

    if ((rest == 10) || (rest == 11)) rest = 0;
    if (rest != parseInt(strCPF.substring(9, 10))) cpfIsValid = false;

    sum = 0;
    for (i = 1; i <= 10; i++) sum = sum + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
    rest = (sum * 10) % 11;
    if ((rest == 10) || (rest == 11)) rest = 0;
    if (rest != parseInt(strCPF.substring(10, 11))) cpfIsValid = false;

    return cpfIsValid;
  }
  function verifyCnpj(cnpjValue) {
    var cnpj = cnpjValue;
    cnpj = cnpj.replace(/[^\d]+/g, '');

    if (!cnpj) return false

    if (cnpj.length != 14)
      return false

    // Elimina CNPJs invalidos conhecidos
    if (cnpj == "00000000000000" ||
      cnpj == "11111111111111" ||
      cnpj == "22222222222222" ||
      cnpj == "33333333333333" ||
      cnpj == "44444444444444" ||
      cnpj == "55555555555555" ||
      cnpj == "66666666666666" ||
      cnpj == "77777777777777" ||
      cnpj == "88888888888888" ||
      cnpj == "99999999999999")
      return false

    // Valida DVs
    var tamanho, numeros, soma, pos, digitos, resultado;
    tamanho = cnpj.length - 2
    numeros = cnpj.substring(0, tamanho);
    digitos = cnpj.substring(tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (var i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
        pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(0))
      return false

    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
        pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(1))
      return false

    return true;
  }

  function verifyPhone(formPhone) {
    let phoneIsValid = true;

    if (!formPhone) return false;

    let phone = formPhone.replace(/\D/g, '');
    if (!(phone.length >= 10 && phone.length <= 11)) phoneIsValid = false;
    if (phone.length === 11 && parseInt(phone.substring(2, 3)) !== 9) phoneIsValid = false;

    for (var n = 0; n < 10; n++) {
      if (phone === new Array(11).join(n) || phone === new Array(12).join(n)) phoneIsValid = false;
    }

    var codigosDDD = [11, 12, 13, 14, 15, 16, 17, 18, 19, 21, 22, 24, 27, 28, 31, 32, 33, 34, 35, 37, 38, 41, 42, 43, 44, 45, 46, 47, 48, 49, 51, 53, 54, 55, 61, 62, 64, 63, 65, 66, 67, 68, 69, 71, 73, 74, 75, 77, 79, 81, 82, 83, 84, 85, 86, 87, 88, 89, 91, 92, 93, 94, 95, 96, 97, 98, 99];
    if (codigosDDD.indexOf(parseInt(phone.substring(0, 2))) === -1) phoneIsValid = false;
    if (phone.length === 10 && [2, 3, 4, 5, 7].indexOf(parseInt(phone.substring(2, 3))) === -1) phoneIsValid = false;




    return phoneIsValid;

  }

  /**
   * method to set the custom element validate message.
   */
  function setElementValidity(element) {
    const { validity, name, value } = element;

    setValues(values => ({ ...values, [name]: value }));

    if ((name === 'tam_cpfcnpj') && validity.valid) {
      const cpfCnpj = value;

      if (cpfCnpj && cpfCnpj.length > 14) {
        const cnpjValid = verifyCnpj(cpfCnpj);
        if (!cnpjValid) {
          element.setCustomValidity("CNPJ inválido");
        }
        
      }else{
        const cpfValid = verifyCpf(cpfCnpj);
        if (!cpfValid) {
          element.setCustomValidity("CPF inválido");
        }

      }

    }

    if ((name === 'tam_inscEstadual') && validity.valid) {
      const stateReg = value;
      if (stateReg && stateReg.length !== 15) {
        element.setCustomValidity("Dado inválido");
      }
    }

    if ((name === 'tam_phone') && validity.valid) {
      const phone = value;

      const phoneValid = verifyPhone(phone);
      if (!phoneValid) {
        element.setCustomValidity("Telefone inválido");
      }
    }

    if ((name === 'confirmEmail') && validity.valid) {
      const confirmEmail = value;

      const confirmEmailValid = confirmEmail === values.email;
      if (!confirmEmailValid) {
        element.setCustomValidity("Os emails não são iguais");
      }
    }

    if ((name === 'password' || name === 'confirmPassword') && validity.valid) {
      const login = values.email;
      const password = value;
      const policies = props.passwordPolicies;
      const passwordValid = passwordHelpers.validatePassword(policies, { login, password });
      if (!passwordValid) {
        element.setCustomValidity(getEmbeddedAssistance());
      }
    }

    if (name === 'confirmPassword' && validity.valid) {
      if (values.password && value && values.password !== value) {
        element.setCustomValidity(alertPasswordNotMatched);
      }
    }

    if (name === 'state' && validity.valid) {
      if(value && /[a-z]/g.test(value))
        element.setCustomValidity("Deve ser maiúsculo!");
    }
  }

  /**
   * function to handle checkbox inputs on form submission
   * TODO Fix for: Checkbox value is not submitted as part of the form when it is unchecked
   * TODO Change this implementation once the form component is fixed to handle checkbox values
   */
  const handleOnSubmitForm = event => {
    event.preventDefault();
    document.querySelector('#receiveEmailYesHidden').disabled = false;
    if (document.querySelector('#receiveEmailYes').checked) {
      document.querySelector('#receiveEmailYesHidden').disabled = true;
    }

    if (requireGDPRP13nConsent) {
      document.querySelector('#GDPRProfileP13nConsentGrantedHidden').disabled = false;
      if (document.querySelector('#GDPRProfileP13nConsentGranted').checked) {
        document.querySelector('#GDPRProfileP13nConsentGrantedHidden').disabled = true;
      }
    }
  };

  const scrollToTop = () => {
    if(window && window.scrollY && window.scrollY !== 0)
      window.scrollTo(0, 0)
  }

  function verifyForNextStep() {
    let form = document.querySelector('#createProfileForm');

    const { elements = [] } = form;

    for (let i = 0; i < elements.length; i++) {
      setElementValidity(elements[i], form);
    }

    if (form.checkValidity()) {
      setTimeout(
        () => setCurrentStep(2), 0
      );
    }

    scrollToTop()
  }

  function cpfCnpjMask(e) {
    let inputValue = e.currentTarget.value;

    if (inputValue && inputValue.length > 14) {
      inputValue = inputValue
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1/$2')
        .replace(/(\d{4})(\d)/, '$1-$2')
        .replace(/(-\d{2})\d+?$/, '$1')

      setIsB2B(true)      
    } else {
      inputValue = inputValue
        .replace(/\D/g, '')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})/, '$1-$2')
        .replace(/(-\d{2})\d+?$/, '$1')

      setIsB2B(false)      
    }


    e.currentTarget.value = inputValue;

    return inputValue;
  }

  function stateRegMask(event) {
    let inputValue = event.currentTarget.value

    inputValue = inputValue
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')

    event.currentTarget.value = inputValue;

    return inputValue
  }

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

  /**
   * @author guilherme.vieira
   * @description When the action "getAddressByCep" is resolved
   * we need fill the address form with these informations
   * @param {Object} address 
   */
  const fillAddressForm = address => {
    const {
      logradouro = '',
      complemento = '',
      bairro = '',
      localidade = '',
      uf = ''
    } = address

    const streetField = document.querySelector(`#street-${id}`)
    if(streetField) streetField.value = logradouro
    
    const complementField = document.querySelector(`#complement-${id}`)
    if(complementField) complementField.value = complemento
    
    const neighborhoodField = document.querySelector(`#neighborhood-${id}`)
    if(neighborhoodField) neighborhoodField.value = bairro

    const cityField = document.querySelector(`#city-${id}`)
    if(cityField) cityField.value = localidade

    const stateField = document.querySelector(`#state-${id}`)
    if(stateField && uf !== "") stateField.value = uf
    
    setIsAddressFormSpinnerVisible(false)
    document.querySelector('main').style.position = ''
  }

  const getAddressByCEP = async (cep) => {
    const cepParsed = cep.replace(new RegExp(/\D/, 'gi'), "")
    document.querySelector('main').style.position = 'relative'
    setIsAddressFormSpinnerVisible(true)
    const getAddressByCepResponse = await action('getAddressByCep', { cep: cepParsed })
    fillAddressForm(getAddressByCepResponse)
  } 

  function cepMask(e) {
    let inputValue = e.currentTarget.value;

    inputValue = inputValue
      .replace(/\D/g, '')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(-\d{3})\d+?$/, '$1')

    e.currentTarget.value = inputValue;

    if(inputValue.length === 9)
      getAddressByCEP(inputValue)

    return inputValue;
  }

  /**
   * Displays the information related to create profile email success.
   * This is displayed only when secure email flow is enabled.
   */
  const getSecureEmailRegistrationSuccessInfo = () => {
    return <Alert id="ProfileRegistration__Alert" type="success" message={alertCreateProfileEmailSentSuccessful} />;
  };

  /**
   * this method displays the registration form
   *
   * if the user is not authenticated
   *    and form is not submitted - displays registration form
   * if the user is not authenticated
   *    and form is submitted - displays secure email registration success information
   */
  const getProfileRegistrationContent = () => {
    return (
      <>

        {accountCreationStatus && (
          <Alert id="ProfileRegistration__Alert" type="error" message={accountCreationStatus} />
        )}

        {!props.secureEmailEnabled && <input type="hidden" name="autoLogin" value={autoLogin} />}

        <div className="custom-row">

          {/* firstName */}
          <div className="custom-col-md-6 custom-col-xs-12">
            <label className="label" htmlFor={`firstName-${id}`}>{labelFirstName}</label>
            <input
              type="text"
              id={`firstName-${id}`}
              name="firstName"
              defaultValue={firstName}
              maxLength="255"
              autoComplete="given-name"
              autoCapitalize="words"
              required
            />
            <span className="validationMessage"></span>
          </div>

          {/* lastName */}
          <div className="custom-col-md-6 custom-col-xs-12">
            <label className="label" htmlFor={`lastName-${id}`}>{labelLastName}</label>
            <input
              type="text"
              id={`lastName-${id}`}
              name="lastName"
              defaultValue={lastName}
              maxLength="255"
              autoComplete="family-name"
              autoCapitalize="words"
              required={!isB2B}
            />
            <span className="validationMessage"></span>
          </div>
        </div>

        <div className="custom-row">

          {/* CPF */}
          <div className="custom-col-md-4 custom-col-xs-12">
            <label className="label" htmlFor={`CPF-${id}`}>{labelCpf}</label>
            <div className="ProfileRegistration__CPFField">
              <input
                type="text"
                name="tam_cpfcnpj"
                id={`CPF-${id}`}
                defaultValue={cpf}
                onChange={cpfCnpjMask}
                onInput={cpfCnpjMask}
                onPaste={cpfCnpjMask}
                maxLength="18"
                minLength="14"
                autoComplete="cpf"
                required
              />
              <span className="validationMessage"></span>
            </div>
          </div>

          {/* Inscrição Estadual */}
          <div className="custom-col-md-4 custom-col-xs-12">
            <label className="label" htmlFor={`StateReg-${id}`}>{labelStateRegistration}</label>
            <div className="ProfileRegistration__StateRegField">
              <input
                type="text"
                name="tam_inscEstadual"
                id={`StateReg-${id}`}
                onChange={stateRegMask}
                onInput={stateRegMask}
                onPaste={stateRegMask}
                maxLength="15"
              />
              <span className="validationMessage"></span>
            </div>
          </div>

          {/* Phone */}
          <div className="custom-col-md-4 custom-col-xs-12">
            <label className="label" htmlFor={`phone-${id}`}>{labelPhone}</label>
            <div className="ProfileRegistration__PhoneField">
              <input
                type="tel"
                name="tam_phone"
                id={`phone-${id}`}
                mask="(99) 99999-9999"
                defaultValue={phone}
                onChange={phoneMask}
                onInput={phoneMask}
                onPaste={phoneMask}
                maxLength="15"
                minLength="15"
                autoComplete="phone"
                required
              />
              <span className="validationMessage"></span>
            </div>
          </div>

        </div>

        <div className="custom-row">

          {/* email */}
          <div className="custom-col-md-6 custom-col-xs-12">
            <label className="label" htmlFor={`email-${id}`}>{labelEmailAddress}</label>
            <div className="ProfileRegistration__EmailField">
              <input
                type="email"
                name="email"
                id={`email-${id}`}
                defaultValue={email}
                maxLength="255"
                autoComplete="email"
                required
              />
              <span className="validationMessage"></span>
            </div>
          </div>

          {/* Confirm email */}
          <div className="custom-col-md-6 custom-col-xs-12">
            <label className="label" htmlFor={`confirm-email-${id}`}>{labelConfirmEmail}</label>
            <div className="ProfileRegistration__ConfirmEmailField">
              <input
                type="email"
                name="confirmEmail"
                defaultValue={confirmEmail}
                id={`confirm-email-${id}`}
                maxLength="255"
                required
              />
              <span className="validationMessage"></span>
            </div>
          </div>

        </div>


        {/* !secureEmailEnabled && */}
        {/* password */}
        {/* confirmPassword */}
        <div className="custom-row">

          <div className="custom-col-md-6 custom-col-xs-12">
            <label className="label" htmlFor={`password-${id}`}>{labelPassword}</label>
            <span className="ProfileRegistration__PasswordField">
              <input type="password" name="password" id={`password-${id}`} required />
              <span className="validationMessage"></span>
            </span>
          </div>

          <div className="custom-col-md-6 custom-col-xs-12">
            <label className="label" htmlFor={`confirmPassword-${id}`}>{labelPasswordConfirm}</label>
            <span className="ProfileRegistration__ConfirmPasswordField">
              <input type="password" id={`confirmPassword-${id}`} name="confirmPassword" required />
              <span className="validationMessage"></span>
            </span>
          </div>

        </div>


        <ProfileCustomProperties labelYes={labelYes} labelNo={labelNo} />

        <div className="ProfileRegistration__UserPreferences">
          <input type="checkbox" id="receiveEmailYes" name="receiveEmail" defaultValue="yes"></input>

          <label htmlFor="receiveEmailYes">{labelEmailUpdates}</label>
        </div>

        {requireGDPRP13nConsent ? (
          <div className="ProfileRegistration__UserPreferences">
            <input
              type="checkbox"
              id="GDPRProfileP13nConsentGranted"
              name="GDPRProfileP13nConsentGranted"
              defaultValue="true"
            />
            <input
              type="hidden"
              id="GDPRProfileP13nConsentGrantedHidden"
              name="GDPRProfileP13nConsentGranted"
              value="false"
            />
            <label htmlFor="GDPRProfileP13nConsentGranted">{labelGdprConsentGranted}</label>
          </div>
        ) : (
          ''
        )}
        <div className="button-container-create-account">
          <button className="create-account-button-custom" onClick={verifyForNextStep}>
            {buttonAdvance}
          </button>
        </div>

      </>
    );
  };

  return (
    <Styled id="TmbProfileRegistration" css={css}>
      <TmbSpinner show={isAddressFormSpinnerVisible}/>
      <>
        <div className={props.authenticated ? "ProfileRegistration account-finished" : "ProfileRegistration"}>
          {props.authenticated ? (
            <React.Fragment>
              <NotifyAuthSuccessAndNavigate
                formSubmitted={formSubmitted}
                authenticated={props.authenticated}
                defaultAutoLoginSuccessPage={defaultAutoLoginSuccessPage}
                alertCreateProfileSuccessfulTitle={alertCreateProfileSuccessfulTitle}
                alertCreateProfileSuccessfulText={alertCreateProfileSuccessfulText}
                alertCreateProfileSuccessfulButton={alertCreateProfileSuccessfulButton}
                alertAccountCreated={alertAccountCreated}
              />
            </React.Fragment>
          ) : (
            <React.Fragment>

              {accountCreationStatus && (
                <Alert id="ProfileRegistration__Alert" type="error" message={accountCreationStatus} />
              )}
              {!formSubmitted ? (
                <Form
                  action="createProfile"
                  onOk={onOk}
                  onNotOk={onNotOk}
                  setCustomValidity={setElementValidity}
                  setInProgress={setInProgress}
                  onSubmit={handleOnSubmitForm}
                  noValidate
                  className="form-container"
                  siteId={id}
                  currentStep={currentStep}
                >
                  <input id="receiveEmailYesHidden" type="hidden" value="no" name="receiveEmail"></input>

                  <div className={currentStep === 1 ? "" : "hide-form-step"}>
                    <h1 className="title">{formTitleRegister}</h1>
                    {getProfileRegistrationContent()}
                  </div>
                  {currentStep === 2 && (
                    <>

                      <h1 className="title">{formTitleDelivery}</h1>
                      <div className="custom-row">

                        {/* CEP */}
                        <div className="custom-col-md-6 custom-col-xs-12">
                          <label className="label" htmlFor={`cep-${id}`}>{labelCep}</label>
                          <input
                            mask="99999-999"
                            type="text"
                            id={`cep-${id}`}
                            name="cep"
                            onChange={cepMask}
                            onInput={cepMask}
                            onPaste={cepMask}
                            defaultValue={cep}
                            maxLength="9"
                            minLength="9"
                            required
                          />
                          <span className="validationMessage"></span>
                        </div>

                      </div>

                      <div className="custom-row">

                        {/* Street */}
                        <div className="custom-col-md-12">
                          <label className="label" htmlFor={`street-${id}`}>{labelSreet}</label>
                          <div className="ProfileRegistration__streetField">
                            <input
                              type="text"
                              name="street"
                              defaultValue={street}
                              id={`street-${id}`}
                              maxLength="255"
                              autoComplete="street"
                              required
                            />
                            <span className="validationMessage"></span>
                          </div>
                        </div>

                      </div>

                      <div className="custom-row">

                        <div className="custom-col-md-6 custom-col-xs-12 custom-container-fields">

                          {/* Number */}
                          <div className="custom-col-md-6 custom-col-xs-12">
                            <label className="label" htmlFor={`number-${id}`}>{labelNumber}</label>
                            <div className="ProfileRegistration__NumberField">
                              <input
                                type="text"
                                name="number"
                                defaultValue={number}
                                id={`number-${id}`}
                                maxLength="255"
                                required
                              />
                              <span className="validationMessage"></span>
                            </div>
                          </div>

                          {/* Complemento */}
                          <div className="custom-col-md-6 custom-col-xs-12">
                            <label className="label" htmlFor={`complement-${id}`}>{labelComplement}</label>
                            <div className="ProfileRegistration__ComplementField">
                              <input
                                type="text"
                                name="complement"
                                defaultValue={complement}
                                id={`complement-${id}`}
                                maxLength="255"
                              />
                              <span className="validationMessage"></span>
                            </div>
                          </div>
                        </div>


                        {/* Neighborhood */}
                        <div className="custom-col-md-6 custom-col-xs-12">
                          <label className="label" htmlFor={`neighborhood-${id}`}>{labelNeighborhood}</label>
                          <div className="ProfileRegistration__NeighborhoodField">
                            <input
                              type="text"
                              name="neighborhood"
                              defaultValue={neighborhood}
                              id={`neighborhood-${id}`}
                              maxLength="255"
                              required
                            />
                            <span className="validationMessage"></span>
                          </div>
                        </div>

                      </div>

                      <div className="custom-row">
                        {/* City */}
                        <div className="custom-col-md-6 custom-col-xs-12">
                          <label className="label" htmlFor={`city-${id}`}>{labelCity}</label>
                          <span className="ProfileRegistration__CityField">
                            <input type="text" defaultValue={city} name="city" id={`city-${id}`} required />
                            <span className="validationMessage"></span>
                          </span>
                        </div>

                        {/* State */}
                        <div className="custom-col-md-6 custom-col-xs-12">
                          <label className="label" htmlFor={`state-${id}`}>{labelState}</label>
                          <span className="ProfileRegistration__StateField">
                            <input type="text" defaultValue={state} id={`state-${id}`} name="state" maxLength="2" required />
                            <span className="validationMessage"></span>
                          </span>
                        </div>

                      </div>

                      <div className="button-container-create-account">
                        <button className="create-account-button-custom" type="submit" 
                          disabled={inProgress}
                          onClick={() => scrollToTop()}
                        >
                          {concludeButton}
                        </button>
                      </div>
                    </>
                  )}

                </Form>
              ) : getSecureEmailRegistrationSuccessInfo()}


            </React.Fragment>
          )}
        </div>
      </>
    </Styled >
  );
};

export default connect(getPageData)(TmbProfileRegistration);
