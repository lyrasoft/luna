/**
 * Part of starter project.
 *
 * @copyright  Copyright (C) 2021 __ORGANIZATION__.
 * @license    __LICENSE__
 */

import u from '@main';
import '@vendor/choices.js/public/assets/scripts/choices.min.js';

u.$ui.bootstrap.tooltip();

const form = '#admin-form';

u.grid(form).initComponent();
u.$ui.disableOnSubmit(form);
u.$ui.checkboxesMultiSelect(form);

// Switch type
const route = u.route('self');

const typeField = u.selectOne('#input-type');

typeField.addEventListener('change', () => {
  const type = typeField.value;

  if (type) {
    location.href = route.replace(/\{\{type\}\}/, type);
  }
});
