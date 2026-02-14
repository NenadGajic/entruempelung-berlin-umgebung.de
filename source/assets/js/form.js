(function () {
    'use strict';

    const SELECTORS = {
        serviceField: '#service',
        conditionalGroup: '.conditional-group',
        contactForm: '#contact-form',
    };

    const FORM_REQUEST_TIMEOUT_MS = 15000;
    const ALLOWED_SERVICES = ['entruempelung', 'entsorgung', 'aufloesung', 'umzug', 'transport'];

    function updateServiceDependentFields() {
        const serviceField = document.querySelector(SELECTORS.serviceField);
        if (!serviceField) {
            return;
        }

        const selectedService = serviceField.value;

        const groups = document.querySelectorAll(SELECTORS.conditionalGroup);
        groups.forEach(function (group) {
            const servicesRaw = group.dataset.service;
            if (!servicesRaw) {
                group.style.display = 'none';
                return;
            }

            const services = String(servicesRaw)
                .split(',')
                .map(function (service) {
                    return service.trim();
                });

            const isVisible = services.includes(selectedService);
            group.style.display = isVisible ? '' : 'none';

            const controls = group.querySelectorAll('input, select, textarea');
            controls.forEach(function (control) {
                control.disabled = !isVisible;
            });
        });
    }

    function preselectServiceFromQuery() {
        const serviceField = document.querySelector(SELECTORS.serviceField);
        if (!serviceField) {
            return;
        }

        const selectedService = new URLSearchParams(window.location.search).get('service');
        if (selectedService && ALLOWED_SERVICES.includes(selectedService)) {
            serviceField.value = selectedService;
        }
    }

    function setMessage(element, message) {
        if (!element) {
            return;
        }

        if (!message) {
            element.style.display = 'none';
            element.textContent = '';
            return;
        }

        element.style.display = 'block';
        element.textContent = message;
    }

    function setSubmitButtonLoadingState(button, isLoading, defaultHtml) {
        if (!button) {
            return;
        }

        button.disabled = isLoading;

        if (isLoading) {
            button.setAttribute('aria-disabled', 'true');
            button.setAttribute('aria-busy', 'true');
            button.textContent = 'Wird gesendet...';
            return;
        }

        button.removeAttribute('aria-disabled');
        button.removeAttribute('aria-busy');
        button.innerHTML = defaultHtml;
    }

    function getFieldDisplayName(field, form) {
        if (!field) {
            return '';
        }

        if (field.id && form) {
            const label = form.querySelector('label[for="' + field.id + '"]');
            if (label) {
                return label.textContent.trim();
            }
        }

        return field.getAttribute('name') || '';
    }

    function getMissingRequiredFieldLabels(form) {
        const requiredFields = form.querySelectorAll('[required][name]');
        const missingLabels = [];

        requiredFields.forEach(function (field) {
            const value = field.value;
            const isMissing = typeof value === 'string' ? value.trim() === '' : !value;

            if (!isMissing) {
                return;
            }

            const label = getFieldDisplayName(field, form);
            if (label && !missingLabels.includes(label)) {
                missingLabels.push(label);
            }
        });

        return missingLabels;
    }

    function fetchWithTimeout(url, options, timeoutMs) {
        if (typeof window.AbortController !== 'function') {
            return window.fetch(url, options);
        }

        const controller = new window.AbortController();
        const timeoutId = window.setTimeout(function () {
            controller.abort();
        }, timeoutMs);

        const requestOptions = Object.assign({}, options, {
            signal: controller.signal,
        });

        return window.fetch(url, requestOptions).finally(function () {
            window.clearTimeout(timeoutId);
        });
    }

    function buildEncodedFormPayload(form) {
        const formData = new FormData(form);

        if (!formData.get('form-name')) {
            formData.set('form-name', form.getAttribute('name') || 'contact');
        }

        const filteredEntries = Array.from(formData.entries()).filter(function (entry) {
            const key = entry[0];
            const value = entry[1];

            if (key === 'form-name') {
                return true;
            }

            if (typeof value !== 'string') {
                return true;
            }

            return value.trim() !== '';
        });

        return new URLSearchParams(filteredEntries).toString();
    }

    function handleContactFormSubmit(event) {
        if (typeof window.fetch !== 'function') {
            return;
        }

        event.preventDefault();

        const form = event.target;
        const submitButton = document.getElementById('form-submit-button');
        const formError = document.getElementById('form-error');
        const formStatus = document.getElementById('form-status');
        const formSuccess = document.getElementById('form-success');
        const submitButtonHtml = submitButton ? submitButton.innerHTML : '';

        if (submitButton && submitButton.disabled) {
            return;
        }

        setMessage(formError, '');
        if (formSuccess) {
            formSuccess.style.display = 'none';
        }

        if (!form.checkValidity()) {
            const missingRequiredFields = getMissingRequiredFieldLabels(form);
            const messageBase = 'Bitte füllen Sie alle Pflichtfelder aus.';
            const message = missingRequiredFields.length
                ? messageBase + ' Fehlend: ' + missingRequiredFields.join(', ') + '.'
                : messageBase;

            setMessage(formStatus, '');
            setMessage(formError, message);

            const firstInvalid = form.querySelector(':invalid');
            if (firstInvalid && typeof firstInvalid.focus === 'function') {
                firstInvalid.focus();
            }

            form.reportValidity();
            return;
        }

        setMessage(formStatus, 'Ihre Anfrage wird gesendet...');
        setSubmitButtonLoadingState(submitButton, true, submitButtonHtml);

        const payload = buildEncodedFormPayload(form);

        fetchWithTimeout('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: payload,
        }, FORM_REQUEST_TIMEOUT_MS)
            .then(function (response) {
                if (!response.ok) {
                    throw new Error('Request failed');
                }

                form.style.display = 'none';
                setMessage(formStatus, '');

                if (formSuccess) {
                    formSuccess.style.display = 'block';
                }
            })
            .catch(function (error) {
                setMessage(formStatus, '');
                const message = error && error.name === 'AbortError'
                    ? 'Die Anfrage hat zu lange gedauert. Bitte versuchen Sie es erneut.'
                    : 'Beim Senden Ihrer Anfrage ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.';
                setMessage(formError, message);
                setSubmitButtonLoadingState(submitButton, false, submitButtonHtml);
            });
    }

    function initializeContactForm() {
        const serviceField = document.querySelector(SELECTORS.serviceField);
        if (serviceField) {
            serviceField.addEventListener('change', updateServiceDependentFields);
            preselectServiceFromQuery();
            updateServiceDependentFields();
        }

        const contactForm = document.querySelector(SELECTORS.contactForm);
        if (contactForm) {
            contactForm.addEventListener('submit', handleContactFormSubmit);
        }
    }

    document.addEventListener('DOMContentLoaded', initializeContactForm);
})();
