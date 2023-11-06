import '@main';

u.$ui.bootstrap.tooltip();

const form = '#admin-form';

u.grid(form).initComponent();
u.$ui.disableOnSubmit(form);
u.$ui.checkboxesMultiSelect(form);

// Switch type
const route = u.route('self');

const typeField = u.selectOne<HTMLInputElement>('#input-type')!;

typeField.addEventListener('change', () => {
  const type = typeField.value;

  if (type) {
    location.href = route.replace(/\{\{type\}\}/, type);
  }
});
