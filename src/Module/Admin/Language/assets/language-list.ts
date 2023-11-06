import '@main';

u.$ui.bootstrap.tooltip();

const form = '#admin-form';

u.grid(form).initComponent();
u.$ui.disableOnSubmit(form);
u.$ui.checkboxesMultiSelect(form);
