// JS file for Auth

import '@main';

u.formValidation()
  .then(() => {
    u.$ui.disableOnSubmit('#user-form');
  });
