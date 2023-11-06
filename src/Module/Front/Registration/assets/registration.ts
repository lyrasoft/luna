// JS file for Registration

import '@main';

u.formValidation()
  .then(() => {
    u.$ui.disableOnSubmit('#registration-form');
    u.$ui.disableOnSubmit('#registration-form-extra');
  });
