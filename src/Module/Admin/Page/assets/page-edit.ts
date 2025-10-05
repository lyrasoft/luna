import {
  injectCssToDocument,
  useBs5Tooltip,
  useDisableIfStackNotEmpty,
  useDisableOnSubmit,
  useFormComponent,
  useFormValidation,
  useFormValidationSync,
  useKeepAlive
} from '@windwalker-io/unicorn-next';
import { Modal } from 'bootstrap';
import { usePageBuilder } from '~vendor/lyrasoft/luna/dist/luna';
import css from '~vendor/lyrasoft/luna/dist/luna-admin.css?inline';

injectCssToDocument(css);
usePageBuilder();

const formSelector = '#admin-form';

useBs5Tooltip();

useFormComponent(formSelector);

useFormValidation()
  .then(validateOptionsModal)
  .then(() => useDisableOnSubmit(formSelector));

useDisableIfStackNotEmpty();

useKeepAlive(location.href);

// Init Page Builder Admin
// usePageBuilder();

// Auto open options
const url = new URL(location.href);
const titleInput = document.querySelector<HTMLInputElement>('#input-item-title')!;
const aliasInput = document.querySelector<HTMLInputElement>('#input-item-alias')!;

if (url.searchParams.get('new') === '1' || titleInput.value === '') {
  const modal = Modal.getOrCreateInstance('#options-modal');

  aliasInput.value = '';

  modal.show();

  setTimeout(() => {
    titleInput.focus();
  }, 300);
}

// Validate options
function validateOptionsModal() {
  const validation = useFormValidationSync(formSelector)!;

  const modal = document.querySelector<HTMLDivElement>('#options-modal')!;

  modal.addEventListener('hide.bs.modal', (e) => {
    const result = validation.validateAll(
      Array.from(modal.querySelectorAll<HTMLInputElement>('[uni-field-validate]'))
    );

    if (!result) {
      e.stopPropagation();
      e.preventDefault();
    }
  });
}

// Change alias path value
document.getElementById('js-save-button')
  ?.addEventListener('click', () => {
    const button = document.querySelector<HTMLAnchorElement>('.js-preview-button')!;

    const link = button.href;
    const value = document.querySelector<HTMLInputElement>('#input-item-alias')!.value;
    const pre = link.split('page/');
    const next = pre[1].split('?');

    if (next[0] !== value) {
      button.href = pre[0] + 'page/' + value + '?' + next[1];
    }
  });
