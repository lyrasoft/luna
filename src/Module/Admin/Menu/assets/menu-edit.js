/**
 * Part of starter project.
 *
 * @copyright  Copyright (C) 2021 __ORGANIZATION__.
 * @license    __LICENSE__
 */

import '@main';

u.$ui.bootstrap.tooltip();

const form = '#admin-form';

u.formValidation()
  .then(() => u.$ui.disableOnSubmit(form));
u.form(form).initComponent();
u.$ui.keepAlive(location.href);
u.$ui.tomSelect('.js-tom-select')

// Menu control
const currentType = u.data('current.type');
const typeField = u.selectOne('#input-item-type');

typeField.addEventListener('change', (e) => {
  if (typeField.value !== '' && typeField.value !== currentType) {
    const v = u.$validation.get('#admin-form')[0];
    v.options.enabled = false;

    u.form(form).post(null, { task: 'switch_type' });
  }
});

const currentView = u.data('current.view');
const viewField = u.selectOne('#input-item-view');

viewField.addEventListener('change', (e) => {
  if (viewField.value !== '' && viewField.value !== currentView) {
    const v = u.$validation.get('#admin-form')[0];
    v.options.enabled = false;

    u.form(form).post(null, { task: 'switch_type' });
  }
});
