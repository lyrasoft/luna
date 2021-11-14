/**
 * Part of starter project.
 *
 * @copyright  Copyright (C) 2021 __ORGANIZATION__.
 * @license    __LICENSE__
 */

import u from '@main';

u.$ui.bootstrap.tooltip();

const form = '#admin-form';

u.formValidation()
  .then(() => u.$ui.disableOnSubmit(form));
u.form(form).initComponent();
u.$ui.keepAlive(location.href);

// Menu control
const currentType = u.data('current.type');
const typeField = u.selectOne('#input-item-type');

typeField.addEventListener('change', (e) => {
  if (typeField.value !== currentType) {
    const v = u.$validation.get('#admin-form');
    console.log(v);
    // Phoenix.validation('#admin-form').options.enabled = false;
    // Phoenix.post(null, { task: 'switch_type' });

    u.form(form).post(null, { task: 'switch_type' });
  }
});

const currentView = u.data('current.view');
const viewField = u.selectOne('#input-item-view');

viewField.addEventListener('change', (e) => {
  if (viewField.value !== currentView) {
    const v = u.$validation.get('#admin-form');
    v.options.enabled = false;

    u.form(form).post(null, { task: 'switch_type' });
  }
});

// File
u.$ui.s3Uploader().then(() => {
  return S3Uploader.get('file')
}).then((s3) => {
  s3.on('success', (...args) => {
    console.log(...args);
  });
});
