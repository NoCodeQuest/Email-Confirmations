var Webflow = Webflow || [];
Webflow.push(function() {

  /*************************************************
    Configurations for the form submission
  *************************************************/

  // replace with your form ID
  const form = document.getElementById('email-form');

  // replace with your Webflow Error Message Div Block ID here.
  let failureMessage = document.getElementById('error-message');

  // replace with your Webflow Success Message Div Block ID here.
  let successMessage = document.getElementById('success-message');

  // set the request timeout, in milliseconds (1000ms = 1second),
  // until we display an error message when not hearing a response
  // from the backend
  let requestTimeout = 30000;

  // messages
  let emailSentHTML = "<br><br>Check your email and confirm your account now (<a href='/'>resend</a>)"
  let errorMessageTimedOut = 'Oops! Seems this timed out. Please try again.';
  let errorMessage = 'Oops! Something went wrong. Please try again.';

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

  // show the email successfully sent message
  function emailSuccessfullySent(email) {
    successMessage.innerHTML = "<strong>" + email + "</strong>" + emailSentHTML;
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
      let data = JSON.parse(xhr.responseText);

      if (xhr.status != 200) {
        displayError(errorMessage);
      } else {
        emailSuccessfullySent(data.email)
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
