import {
  useBs5Tooltip,
  useDisableIfStackNotEmpty,
  useDisableOnSubmit,
  useFormComponent,
  useFormValidation,
  useKeepAlive, useTomSelect
} from '@windwalker-io/unicorn-next';

const formSelector = '#admin-form';

useBs5Tooltip();

useFormComponent(formSelector);

useFormValidation().then(() => useDisableOnSubmit(formSelector));

useDisableIfStackNotEmpty();

useKeepAlive(location.href);


useTomSelect('.has-tom-select');

const form = document.querySelector<HTMLFormElement>(formSelector);

const passwordInput = document.querySelector<HTMLInputElement>('[data-input-password]');
const password2Input = document.querySelector<HTMLInputElement>('[data-validate=password-confirm]');

passwordInput?.addEventListener('input', () => {
  if (passwordInput?.value) {
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
