import '@main';

u.$ui.bootstrap.tooltip();

const form = '#admin-form';

u.grid(form).initComponent();
u.$ui.disableOnSubmit(form);
u.$ui.checkboxesMultiSelect(form);

// User Switch
const $modal = document.querySelector<HTMLDivElement>('#user-switch-modal')!;
const $switchUserId = $modal.querySelector<HTMLInputElement>('[data-role=user_id]')!;

$modal?.addEventListener('hidden.bs.modal', () => {
  $switchUserId.value = '';
});

u.directive('user-switch-button', {
  mounted(el, { value }) {
    value = JSON.parse(value || '{}');
    el.addEventListener('click', () => {
      u.$ui.bootstrap.modal($modal).show();
      $switchUserId.value = value.id;
      $modal.querySelector('[data-role=user_name]')!.textContent = value.name;
    });
  },
  updated(el, bindings) {
    console.log(bindings);
  }
});

u.directive('user-switch-modal', {
  mounted(el, { value }) {
    u.selectAll('[data-role=switch_button]', ($btn) => {
      $btn.addEventListener('click', (e) => {
        const $btn = e.currentTarget as HTMLButtonElement;
        const stage = $btn.dataset.stage;
        const options = JSON.parse($btn.dataset.options || '{}');

        if ($switchUserId.value !== '') {
          u.grid(form).doTask('switchUser', $switchUserId.value, null, { stage, options });
        } else {
          alert('No user ID');
        }
      });
    });
  }
});
