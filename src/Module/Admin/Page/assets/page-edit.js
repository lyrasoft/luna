/**
 * Part of starter project.
 *
 * @copyright  Copyright (C) 2021 __ORGANIZATION__.
 * @license    __LICENSE__
 */

import '@main';

u.$ui.bootstrap.tooltip();

const form = '#admin-form';

u.formValidation(form)
  .then(validateOptionsModal)
  .then(() => u.$ui.disableOnSubmit(form));
u.form(form).initComponent();
u.$ui.keepAlive(location.href);

// Auto open options
const url = new URL(location.href);
const titleInput = u.selectOne('#input-item-title');
const aliasInput = u.selectOne('#input-item-alias');

if (url.searchParams.get('new') === '1' || titleInput.value === '') {
  const modal = u.$ui.bootstrap.modal('#options-modal');

  aliasInput.value = '';

  modal.show();

  setTimeout(() => {
    titleInput.focus();
  }, 300);
}

// Validate options
function validateOptionsModal([ validation ]) {
  const modal = u.selectOne('#options-modal');

  modal.addEventListener('hide.bs.modal', (e) => {
    var result = validation.validateAll(modal.querySelectorAll('[uni-field-validate]'));

    if (!result) {
      e.stopPropagation();
      e.preventDefault();
    }
  });
}

// Change alies path value
document.getElementById('js-save-button').onclick = function () {
  const link = document.querySelector('.js-preview-button').href;
  const value = document.querySelector('#input-item-alias').value;
  const pre = link.split('page/');
  const next = pre[1].split('?');

  if (next[0] !== value) {
    document.querySelector('.js-preview-button').href = pre[0] + 'page/' + value + '?' + next[1];
  }
}
