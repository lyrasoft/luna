/**
 * Part of starter project.
 *
 * @copyright    Copyright (C) 2021 __ORGANIZATION__.
 * @license        __LICENSE__
 */

import u from '@main';

u.formValidation().then(() => {
  u.$ui.disableOnSubmit();
});
u.form('#admin-form').initComponent();

u.$ui.bootstrap.tooltip();
u.$ui.tomSelect('.js-tom-select');


