/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.
 */

import React, { useCallback, useContext } from 'react';
import { formToHref, formToJson } from '@oracle-cx-commerce/react-components/utils';
import { StoreContext } from '@oracle-cx-commerce/react-ui/contexts';
import Styled from '@oracle-cx-commerce/react-components/styled';
import css from '@oracle-cx-commerce/react-components/form/styles.css';
import { setDefaultValidity } from '@oracle-cx-commerce/react-components/form/utils';
import { WARNING_ICON_HTML } from '@oracle-cx-commerce/react-components/form/constants';
import { noop } from '@oracle-cx-commerce/utils/generic';
import { useNavigator } from '@oracle-cx-commerce/react-components/link';
import PropTypes from 'prop-types';

/**
 * Displays the form component
 */
const Form = ({
    children,
    action,
    method = 'post',
    noValidate = false,
    enableUnsavedChangesTracking = false,
    setCustomValidity = noop,
    onSubmit = noop,
    onResolve = noop,
    onReject = noop,
    onComplete = noop,
    onOk = noop,
    onNotOk = noop,
    setInProgress = noop,
    autoComplete = 'off',
    formRef = null,
    siteId,
    currentStep
}) => {
    const store = useContext(StoreContext);

    const goToPage = useNavigator();

    // Called onInput and onSubmit for every form element to set any custom error messages (optional)
    const setElementValidity = useCallback(
        (element, form) => {
            const { nextElementSibling } = element;

            element.setCustomValidity('');

            // Callback to set default validity message(s) (optional)
            setDefaultValidity(element, form);

            // Callback to set custom error message(s) (optional)
            setCustomValidity(element, form);

            if (
                noValidate &&
                element.willValidate &&
                nextElementSibling &&
                nextElementSibling.matches('.validationMessage')
            ) {
                nextElementSibling.textContent = element.validationMessage;
                if (element.validationMessage) {
                    nextElementSibling.insertAdjacentHTML('afterbegin', WARNING_ICON_HTML);
                    nextElementSibling.style.display = 'block'
                    element.style.borderColor = '#d1001a'
                } else {
                    element.style.borderColor = '#cdd2d6'
                }
            }
        },
        [noValidate, setCustomValidity]
    );

    // onInvalid handler
    const invalid = useCallback(event => {
        // Indicate that form is invalid
        event.target.closest('form').classList.add('invalid');
    }, []);

    // onInput (<input>|<textarea> elements) handler
    const input = useCallback(
        event => {
            const { target } = event;
            // We get the data-set values in the form of strings. Hence we get 'disablechangetracking' value as 'false' or 'true'
            const disbaleFieldLevelChangeTracking = target.dataset.disablechangetracking || false;
            if (
                enableUnsavedChangesTracking &&
                (disbaleFieldLevelChangeTracking === false || disbaleFieldLevelChangeTracking === 'false')
            ) {
                // Mark form as dirty
                target.closest('form').dataset.dirty = true;
            }

            setElementValidity(target);
        },
        [enableUnsavedChangesTracking, setElementValidity]
    );

    // onChange (<select> elements) handler
    const change = useCallback(
        event => {
            const { target } = event;

            if (target.tagName === 'SELECT') {
                // We get the data-set values in the form of strings. Hence we get 'disablechangetracking' value as 'false' or 'true'
                const disbaleFieldLevelChangeTracking = target.dataset.disablechangetracking || false;
                if (
                    enableUnsavedChangesTracking &&
                    (disbaleFieldLevelChangeTracking === false || disbaleFieldLevelChangeTracking === 'false')
                ) {
                    // Mark form as dirty
                    target.closest('form').dataset.dirty = true;
                }
                setElementValidity(target);
            }
        },
        [enableUnsavedChangesTracking, setElementValidity]
    );

    // onSubmit handler
    const submit = useCallback(
        event => {
            event.preventDefault();
            if(currentStep === 2){
                const form = event.target;
                const { elements = [] } = form;
    
                for (let i = 0; i < elements.length; i++) {
                    setElementValidity(elements[i], form);
                }
    
                if (
                    form.checkValidity() && // Check is form is valid
                    onSubmit(event) !== false // Callback - form is valid and will submit, returning false to stop submission
                ) {
                    // Indicate that form is valid (not invalid)
                    form.classList.remove('invalid');
    
                    if (method.toLocaleLowerCase() === 'get') {
                        // Simulate behavior of a GET Form
                        // Convert form to url (with query string)
                        const href = formToHref(form);
    
                        // Then navigate to that url
                        goToPage(href);
                    } else {
                        // Simulate behavior of a POST Form
                        // Convert for to json object
                        const payload = formToJson(form);
    
                        payload.shippingAddresses = [{
                            firstName: document.querySelector('#firstName-' + siteId).value,
                            lastName: document.querySelector('#lastName-' + siteId).value,
                            address1: document.querySelector('#street-' + siteId).value,
                            address2: document.querySelector('#number-' + siteId).value,
                            address3: document.querySelector('#complement-' + siteId).value,
                            county: document.querySelector('#neighborhood-' + siteId).value,
                            city: document.querySelector('#city-' + siteId).value,
                            postalCode: document.querySelector('#cep-' + siteId).value,
                            state: document.querySelector('#state-' + siteId).value,
                            isDefaultAddress: true,
                            country: "BR"
                        }];
    
                        const isB2B = payload.tam_cpfcnpj.length === 14 ? false : true
                        payload.tam_isB2B_user = isB2B
    
                        if(isB2B) {
                            payload.lastName = "empty"
                            payload.tam_razao = payload.firstName
                        }
    
                        if(payload.tam_inscEstadual === "") payload.tam_inscEstadual = "ISENTO"
                        
                        // Invoke the named action passing form json object as payload
                        store
                            .action(action, payload)
                            .then(response => {
                                // Callback - action is resolved (i.e. no runtime error)
                                onResolve(response);
    
                                if (response.ok === false) {
                                    // Callback - action is resolved with !ok status
                                    onNotOk(response);
                                } else {
                                    if (enableUnsavedChangesTracking) {
                                        // Mark form as clean
                                        delete form.dataset.dirty;
                                    }
                                    // Callback - action is resolved with ok status
                                    onOk(response);
                                }
                            })
                            .catch(onReject /* Callback - action is rejected (i.e. runtime error) */)
                            .finally((...args) => {
                                // Callback to indicate action invocation is complete
                                setInProgress(false);
    
                                // Callback - action is complete
                                onComplete(...args);
                            });
    
                        // Callback to indicate action invocation is in progress
                        setInProgress(true);
                    }
                } else if (noValidate) {
                    // By default the browser will focus on the first invalid error element.
                    // Setting noValidate to true disables that functionality.
                    // If that is the case we want to replicate the default focus behavior.
    
                    // Find the first invalid element in the form
                    const invalidElement = form.querySelector(':invalid');
    
                    // If found
                    if (invalidElement) {
                        // Focus on it
                        setTimeout(() => invalidElement.focus());
                    }
                }
            }
        },
        [
            onSubmit,
            noValidate,
            setElementValidity,
            method,
            goToPage,
            store,
            action,
            onReject,
            setInProgress,
            onResolve,
            onNotOk,
            enableUnsavedChangesTracking,
            onOk,
            onComplete
        ]
    );

    // onReset handler
    const reset = useCallback(
        event => {
            if (enableUnsavedChangesTracking) {
                // Mark form as clean
                delete event.target.dataset.dirty;
            }
        },
        [enableUnsavedChangesTracking]
    );

    return (
        <Styled id="Form" css={css}>
            <form
                action={action}
                method={method}
                onInvalid={invalid}
                onInput={input}
                onChange={change}
                onSubmit={submit}
                onReset={reset}
                ref={formRef}
                noValidate={noValidate}
                autoComplete={autoComplete}
                id="createProfileForm"
            >
                {children}
            </form>
        </Styled>
    );
};

Form.propTypes = {
    /**
     * Child nodes to by displayed
     */
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,

    /**
     * The name of the Action that will be triggered at form submission.
     */
    action: PropTypes.string,

    /**
     * Request type. For eg : Post.
     */
    method: PropTypes.string,

    /**
     * Whether to validate the form on submission or not
     */
    noValidate: PropTypes.bool
};

Form.defaultProps = {
    method: 'post',
    noValidate: false,
    action: undefined
};

export default Form;
