// Replace _EMAIL_ with the email field
// from the Webflow CMS Collection
var Webflow = Webflow || [];
Webflow.push(function() {
  let emailField = document.getElementById('email');
  emailField.value="_EMAIL_";
  emailField.disabled="true";
});
