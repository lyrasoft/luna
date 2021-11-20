/**
 * Part of starter project.
 *
 * @copyright  Copyright (C) 2021 __ORGANIZATION__.
 * @license    __LICENSE__
 */

import u from '@main';

u.$ui.bootstrap.tooltip();

const form = '#admin-form';

u.formValidation(form)
  .then(validateOptionsModal)
  .then(() => u.$ui.disableOnSubmit(form));
u.form(form).initComponent();
u.$ui.keepAlive(location.href);

function validateOptionsModal(validation) {
  const modal = u.selectOne('#options-modal');

  modal.addEventListener('hide.bs.modal', (e) => {
    var result = validation.validateAll(modal.querySelectorAll('[uni-field-validate]'));

    if (!result) {
      e.stopPropagation();
      e.preventDefault();
    }
  });
}
