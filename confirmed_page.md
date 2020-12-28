## Confirmed page: Binding Webflow page elements to the custom Javascript code

<img src='assets/confirmed_page_02.png' width='800px'>

Bound to <a href="https://github.com/NoCodeQuest/Email-Confirmations/blob/main/confirmed_page.js#L5">this snippet of code</a>:

```
let emailField = document.getElementById('email');
```  

<img src='assets/confirmed_page_03.png' width='800px'>

Bound to <a href="https://github.com/NoCodeQuest/Email-Confirmations/blob/main/confirmed_page.js#L6">this snippet of code</a>, replacing \_EMAIL\_ with the CMS field from the dropdown shown:

```
emailField.value="_EMAIL_";
```
