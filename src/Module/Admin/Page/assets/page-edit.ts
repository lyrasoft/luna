import '@main';

u.$ui.bootstrap.tooltip();

const form = '#admin-form';

u.formValidation(form)
  .then(validateOptionsModal)
  .then(() => u.$ui.disableOnSubmit(form));
u.form(form).initComponent();
u.$ui.keepAlive(location.href);

// Auto open options
const url = new URL(location.href);
const titleInput = u.selectOne<HTMLInputElement>('#input-item-title')!;
const aliasInput = u.selectOne<HTMLInputElement>('#input-item-alias')!;

if (url.searchParams.get('new') === '1' || titleInput.value === '') {
  const modal = u.$ui.bootstrap.modal('#options-modal');

  aliasInput.value = '';

  modal.show();

  setTimeout(() => {
    titleInput.focus();
  }, 300);
}

// Validate options
function validateOptionsModal(validation: Awaited<ReturnType<typeof u.formValidation>>) {
  const modal = u.selectOne<HTMLDivElement>('#options-modal')!;

  modal.addEventListener('hide.bs.modal', (e) => {
    const result = validation!.validateAll(
      u.selectAll(modal.querySelectorAll<HTMLInputElement>('[uni-field-validate]'))
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
