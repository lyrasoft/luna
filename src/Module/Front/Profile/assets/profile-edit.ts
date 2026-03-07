import { useBs5Tooltip, useFormValidation, useDisableOnSubmit, useKeepAlive } from '@windwalker-io/unicorn-next';

const formSelector = '#profile-form';

useBs5Tooltip();

useFormValidation().then(() => useDisableOnSubmit(formSelector));

useKeepAlive(location.href);

const form = document.querySelector<HTMLFormElement>(formSelector)!;

const passwordInput = document.querySelector<HTMLInputElement>('[data-input-password]');
const password2Input = document.querySelector<HTMLInputElement>('[data-validate=password-confirm]');

passwordInput?.addEventListener('input', () => {
  if (passwordInput.value) {
    password2Input?.setAttribute('required', 'true');
  } else {
    password2Input?.removeAttribute('required');
  }
});

if (form?.hasAttribute('uni-srp-registration')) {
  const identityInput = document.querySelector<HTMLInputElement>('[data-input-identity]');
  const oldIdentity = identityInput?.value;

  identityInput?.addEventListener('input', () => {
    if (oldIdentity !== identityInput.value) {
      passwordInput?.setAttribute('required', 'true');
    } else {
      passwordInput?.removeAttribute('required');
    }
  });
}
