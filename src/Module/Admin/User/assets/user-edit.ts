import '@main';

u.$ui.bootstrap.tooltip();

const formId = '#admin-form';

u.formValidation()
  .then(() => u.$ui.disableOnSubmit(formId));

u.form(formId).initComponent();

u.$ui.keepAlive(location.href);

u.$ui.tomSelect('.has-tom-select');

const form = u.selectOne<HTMLFormElement>(formId);

const passwordInput = u.selectOne<HTMLInputElement>('[data-input-password]');
const password2Input = u.selectOne<HTMLInputElement>('[data-validate=password-confirm]');

passwordInput.addEventListener('input', () => {
  if (passwordInput.value) {
    password2Input.setAttribute('required', 'true');
  } else {
    password2Input.removeAttribute('required');
  }
});

if (form.hasAttribute('uni-srp-registration')) {
  const identityInput = u.selectOne<HTMLInputElement>('[data-input-identity]');
  const oldIdentity = identityInput.value;

  identityInput.addEventListener('input', () => {
    if (oldIdentity !== identityInput.value) {
      passwordInput.setAttribute('required', 'true');
    } else {
      passwordInput.removeAttribute('required');
    }
  });
}
