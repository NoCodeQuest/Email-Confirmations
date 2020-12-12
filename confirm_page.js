var Webflow = Webflow || [];
Webflow.push(function() {

  /*************************************************
    Configurations
  *************************************************/

  // replace with your form ID
  const form = document.getElementById('confirm-form');

  // setting taken from the Webflow forms "Redirect URL" field
  // example: https://email-confirmable.webflow.io/confirmed/
  // make sure this url has the trailering "/" or it won't work
  const redirectTo = event.srcElement.dataset.redirect;

  // set the Webflow Error Message Div Block ID to 'error-message'
  let failureMessage = document.getElementById('error-message');

  // set the Webflow Success Message Div Block ID to 'success-message'
  let successMessage = document.getElementById('success-message');

  // set request timeout in milliseconds (1000ms = 1second)
  let requestTimeout = 30000;

  // error messages
  let errorMessageTimedOut = 'Oops! Seems this timed out. Please try again.';
  let errorMessage = 'Oops! Something went wrong. Please try again.';

  /*************************************************
    Functional Code for the hidden field(s)
  *************************************************/

  // get the confirmation token from the url
  let token = (window.location.search).split('?t=')[1]

  // add hidden field to the confirmation form
  // with the token parsed from the url
  let tokenField = document.createElement("input");
  tokenField.setAttribute("type", "hidden");
  tokenField.setAttribute("name", "token");
  tokenField.setAttribute("value", token);
  form.appendChild(tokenField);

  /*************************************************
    Functional Code for the form submission
  *************************************************/

  // display error message
  function displayError(message) {
    hideLoading();
    failureMessage.innerText = message;
    failureMessage.style.display = 'block';
  }

  // hiding the loading indicator
  function hideLoading() {
    showForm();
    successMessage.style.display = 'none';
  }

  // hide the form
  function hideForm() {
    form.style.display = 'none';
  }

  // show the loading indicator
  function showLoading() {
    hideForm();
    successMessage.style.display = 'block';
  }

  // show the form
  function showForm() {
    form.style.display = 'block';
  }

  // listen for xhr events
  function addListeners(xhr) {
    xhr.addEventListener('loadstart', showLoading);
  }

  // add xhr settings
  function addSettings(xhr) {
    xhr.timeout = requestTimeout;
  }

  // triggered form submit
  function triggerSubmit(event) {

    // prevent default behavior form submit behavior
    event.preventDefault();

    // setup + send xhr request
    let formData = new FormData(event.target);
    let xhr = new XMLHttpRequest();
    xhr.open('POST', event.srcElement.action);
    addListeners(xhr);
    addSettings(xhr);
    xhr.send(formData);

    // capture xhr response
    xhr.onload = function() {
      if (xhr.status === 302) {
        let data = JSON.parse(xhr.responseText);
        window.location.assign(redirectTo + data.slug);
      } else {
        displayError(errorMessage);
      }
    }

    // capture xhr request timeout
    xhr.ontimeout = function() {
      displayError(errorMessageTimedOut);
    }
  }

  // capture form submit
  form.addEventListener('submit', triggerSubmit);

});
