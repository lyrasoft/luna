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

// Disable if uploading
u.$ui.disableIfStackNotEmpty();

// KeepAlive
u.$ui.keepAlive(location.href);

// Select
u.$ui.tomSelect('.js-tom-select');

// Tags
u.$ui.tomSelect('#input-item-tags', {
  create: (input) => {
    return {
      value: `new#${input}`,
      text: input,
    }
  },
});
